import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commentSettingsReducer from './commentSettingReducer';

const rootReducer = combineReducers({

    account: userReducer,
    commentSettings: commentSettingsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;