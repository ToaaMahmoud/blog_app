import { UserRoles } from "../../../shared/types/user.enum";

export interface Payload{
    userId : string;
    email: string;
    role: UserRoles
}