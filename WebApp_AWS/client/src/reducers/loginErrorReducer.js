import { FETCH_LOGIN_ERROR } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_LOGIN_ERROR:
      return action.payload || false;
    default:
      return state;
  }
}
