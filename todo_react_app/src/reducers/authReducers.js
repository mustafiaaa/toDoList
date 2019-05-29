import isEmpty from 'is-empty';
import {
    SET_CURRENT_USER,
    USER_LOADING,
    VALIDATING_USER
} from '../actions/types';

// const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    serverResponse: false
};

export default function(state = initialState, action) {
    // console.log("inside auth reducer.....................")
    switch (action.type) {
      case SET_CURRENT_USER:
        console.log("in auth reducer set_current_user...........", action, action.data)
        if(!isEmpty(action.data))
          return {
            ...state,
            user: action.data,
            isAuthenticated: true 
          };
        return state; 
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }