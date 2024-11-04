
import { USER_LOGIN_SUCCESS } from '../action/types';
const INITIAL_STATE = {
    account: {
        UserID: '',
        UserName: '',
        Age: '',
        Gender: '',
        Address: '',
        Email: '',
        Password: '',
        Image: '',
        Role: '',
        isOnline: '',
        Status: 'false',
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:

            return {
                ...state, account: {
                    UserID: action?.payload?.UserID,
                    UserName: action?.payload?.UserName,
                    Age: action?.payload?.Age,
                    Gender: action?.payload?.Gender,
                    Address: action?.payload?.Address,
                    Email: action?.payload?.Email,
                    Password: action?.payload?.Password,
                    Image: action?.payload?.image,
                    Role: action?.payload?.role,
                    isOnline: action?.payload?.isOnline,
                    Status: action?.payload?.status
                },
                isAuthenticated: true
            };


        default: return state;
    }
};

export default userReducer;