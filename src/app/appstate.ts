import { User } from "@app/user/user";
import { IAuthState } from "@app/core/auth.reducer";

export interface IAppState {
    auth?: IAuthState
    routes?: any;
}
