import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commentSettingsReducer from './commentSettingReducer';
import examReducer from './examReducer';

const rootReducer = combineReducers({
    exam: examReducer,
    account: userReducer,
    commentSettings: commentSettingsReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;