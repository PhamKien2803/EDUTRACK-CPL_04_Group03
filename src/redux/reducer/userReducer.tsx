
import { USER_LOGIN_SUCCESS } from '../action/types';
const INITIAL_STATE = {
    account: {
        UserID: '',
        UserName: '',
        Age: '',
        Gender: '',
        Address: '',
        Email: '',
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
            console.log('check', action.payload);

            return {
                ...state, account: {
                    UserID: action?.payload?.id,
                    UserName: action?.payload?.UserName,
                    Age: action?.payload?.Age,
                    Gender: action?.payload?.Gender,
                    Address: action?.payload?.Address,
                    Email: action?.payload?.Email,
                    Image: action?.payload?.Image,
                    Role: action?.payload?.Role,
                    isOnline: action?.payload?.isOnline,
                    Status: action?.payload?.Status
                },
                isAuthenticated: true
            };


        default: return state;
    }
};

export default userReducer;