import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  console.log("inside error reducer.................",action.type)
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}