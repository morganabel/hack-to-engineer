import { Injectable } from "@angular/core";
import { FluxStandardAction } from "flux-standard-action";
import { User } from "@app/user/user";

@Injectable()
export class AuthActions {
  static CHANGEUSER = "CHANGEUSER"; 
  static TOGGLEEDITMODE = "TOGGLEEDITMODE";   

  changeUser(user: User): FluxStandardAction<User> {
    return { 
        type: AuthActions.CHANGEUSER,
        payload: user,
        meta: null
    };
  }

  toggleEditMode(editing: boolean): FluxStandardAction<boolean> {
    return {
      type: AuthActions.TOGGLEEDITMODE,
      payload: editing,
      meta: null
    }
  }
}