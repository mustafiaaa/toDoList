import {combineReducers} from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';

export default combineReducers({
    authReducer: authReducer,
    errorReducer:errorReducer
});