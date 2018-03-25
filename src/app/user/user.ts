import { Roles } from "@app/user/roles";

export interface User {
    id: string;
    displayName: string;
    photoURL: string;
    email: string;
    roles: Roles
    lastUpdate?: Date;
}
