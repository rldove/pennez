import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import profileReducer from "./profileReducer";
import studentReducer from "./studentReducer";
import voiceReducer from "./voiceReducer";
import studentSourceReducer from "./studentSourceReducer";
import loginErrorReducer from "./loginErrorReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  surveys: surveyReducer,
  profile: profileReducer,
  students: studentReducer,
  voices: voiceReducer,
  studentSource: studentSourceReducer,
  loginError: loginErrorReducer
});
