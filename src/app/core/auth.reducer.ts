import { User } from "@app/user/user";
import { Reducer } from "redux";
import { IAppState } from "@app/appstate";
import { FluxStandardAction } from "flux-standard-action";
import { AuthActions } from "@app/core/auth.actions";
import { tassign } from "tassign";

export interface IAuthState {
    user: User;
    editMode: boolean;
}

const INITIAL_STATE: IAuthState = {
    user: null,
    editMode: false
};

export const authReducer: Reducer<IAuthState> = (state: IAuthState = INITIAL_STATE, action: FluxStandardAction<any>) => {
    switch(action.type) {
        case AuthActions.CHANGEUSER:
            return tassign(state, {
                user: action.payload
            });
        case AuthActions.TOGGLEEDITMODE:
            return tassign(state, {
                editMode: action.payload
            });
    }

    return state;
}