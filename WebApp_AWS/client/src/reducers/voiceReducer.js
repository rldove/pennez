import { FETCH_VOICE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_VOICE:
      return action.payload;
    default:
      return state;
  }
}
