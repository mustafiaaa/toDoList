import { GET_ERRORS } from "../actions/types";

const initialState = {
  err_value: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {err_value: action.payload};
    default:
      return state;
  }
}