import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  VALIDATING_USER
} from "./types";

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:3050/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>{ alert('cannot register');
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};

export const loginUser = (userData, dispatch) => {
  axios.post("http://localhost:3050/api/users/login", userData).then( (res) => {
    const { token } = res.data;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    console.log('res.....', res, decoded)
      if(res.data.success){
        console.log('sucesss...........')
        dispatch(loginSuccessed(decoded));
      }
      // else{
      //   console.log('fail........')
      //   dispatch(loginFailed(res.data));
      // }
  });
// Save to localStorage
// Set token to localStorage
  // console.log("...........................inside login user action")
  // const { token } = res.data;
  // localStorage.setItem("jwtToken", token);
  // // Set token to Auth header
  // setAuthToken(token);
  // // Decode token to get user data
  // const decoded = jwt_decode(token);
  // Set current user
  return({
    type: VALIDATING_USER,
  });
};

export const loginSuccessed = (data) => ({
  type: SET_CURRENT_USER,
  data
})

// export const loginFailed = (err) => ({
//   type: USER_LOADING,
//   err
// })

export const setCurrentUser = (decoded, res)=> {
  return async (dispatch) => {
    dispatch({
    type: SET_CURRENT_USER,
    payload: {decoded, res}
    })
  }
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};