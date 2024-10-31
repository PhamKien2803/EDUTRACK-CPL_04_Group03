import { USER_LOGIN_SUCCESS } from "./types"
interface Participant {
    UserID: string;
    UserName: string;
    Age: number;
    Gender: boolean;
    Address: string;
    Email: string;
    Password: string;
    Image: string;
    Role: number;
    isOnline: boolean;
    Status: "true" | "false";
}
export const doLogin = (data: Participant) => {
    return {
        type: USER_LOGIN_SUCCESS,
        payload: data
    }
}