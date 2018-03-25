import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '@app/user/user';
import { NgRedux } from '@angular-redux/store';
import { AuthActions } from '@app/core/auth.actions';
import { IAuthState } from '@app/core/auth.reducer';
import { IAppState } from '@app/appstate';
import { UserCredential } from '@firebase/auth-types';
import { Md5 } from 'ts-md5/dist/md5'; 

@Injectable()
export class AuthService {
    user$: Observable<User>;

    constructor(private fbAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private ngRedux: NgRedux<IAppState>, private authActions: AuthActions) {
        this.user$ = this.fbAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.db.collection("users").doc<User>(user.uid).valueChanges();
                } else {
                    return Observable.of<User>(null);
                }
            }).do((user) => {
                this.ngRedux.dispatch(this.authActions.changeUser(user));
                return user;
            });
    }

    canEdit(user: User): boolean {
        return this.hasPermission(user, ['admin', 'moderator']);
    }

    signInWithEmail(email: string, password: string): Promise<any> {
        return this.fbAuth.auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                return this.setUserData(user).then(() => {
                    return user;
                })
            });
    }

    signInWithGithub(): Promise<any> {
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope("read:user");

        return this.fbAuth.auth.signInWithPopup(provider)
            .then((result: UserCredential) => {
                return this.setUserData(result.user).then(() => {
                    return result.user;
                });
            });
    }

    signInOrLinkGithub(): Promise<any> {
        if (this.fbAuth.auth.currentUser) {
            const provider = new firebase.auth.GithubAuthProvider();
            provider.addScope("read:user");

            return this.fbAuth.auth.currentUser.linkWithPopup(provider)
                .then((result: UserCredential) => {
                    return this.setUserData(result.user).then(() => {
                        return result.user;
                    });
                });
        } else {
            return this.signInWithGithub();
        }
    }

    signOut(): Promise<any> {
        return this.fbAuth.auth.signOut();
    }

    private hasPermission(user: User, roles: string[]): boolean {
        if (!user) return false
        for (const role of roles) {
            if ( user.roles[role] )
                return true;
        }
        return false;
    }

    private setUserData(fbUser: firebase.User) {
        const userRef = this.db.collection("users").doc<any>(fbUser.uid);

        let photoURL = (fbUser.photoURL) ? 
            fbUser.photoURL : 
            `https://www.gravatar.com/avatar/${Md5.hashStr(fbUser.email.trim().toLowerCase())}.jpg?d=identicon`;

        const userData: User = {
            id: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
            roles: {
                user: true
            }
        }

        return userRef.set(userData, { merge: true });
    }
}
