import { FETCH_ACCOUNT } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ACCOUNT:
      return action.payload;
    default:
      return state;
  }
}
