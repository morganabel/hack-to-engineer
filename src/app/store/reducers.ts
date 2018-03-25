import { combineReducers, Reducer } from "redux";
import { routerReducer } from "@angular-redux/router";
import { authReducer } from "@app/core/auth.reducer";
import { IAppState } from "@app/appstate";

export const rootReducer: Reducer<IAppState> = combineReducers({
    auth: authReducer,
    routes: routerReducer
});