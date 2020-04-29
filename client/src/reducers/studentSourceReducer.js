import { FETCH_STUDENT_SOURCE } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_STUDENT_SOURCE:
      return action.payload;
    default:
      return state;
  }
}
