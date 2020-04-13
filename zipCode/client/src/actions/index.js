import axios from "axios";
import {
  FETCH_USER,
  FETCH_ACCOUNT,
  FETCH_STUDENTS,
  FETCH_SURVEYS,
  FETCH_VOICE,
  FETCH_STUDENT_SOURCE,
  FETCH_LOGIN_ERROR
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys/list");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchParentProfile = () => async dispatch => {
  const res = await axios.get("/api/accounts/parentprofile");

  dispatch({ type: FETCH_ACCOUNT, payload: res.data });
};

export const fetchTeacherProfile = () => async dispatch => {
  const res = await axios.get("/api/accounts/teacherprofile");

  dispatch({ type: FETCH_ACCOUNT, payload: res.data });
};

export const fetchStudentProfile = () => async dispatch => {
  const res = await axios.get("/api/student/profile");

  dispatch({ type: FETCH_ACCOUNT, payload: res.data });
};

export const fetchStudents = () => async dispatch => {
  const res = await axios.get("/api/students/list");

  dispatch({ type: FETCH_STUDENTS, payload: res.data });
};

export const fetchStudentSource = () => async dispatch => {
  const res = await axios.get("/api/students/source");

  dispatch({ type: FETCH_STUDENT_SOURCE, payload: res.data });
};

export const submitParentForm = (values, history) => async dispatch => {
  const res = await axios.post("/api/accounts/parents", values);
  await axios
    .post("/api/parent/login", values)
    .then(response => {
      history.push("/");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
    });
};

export const submitTeacherForm = (values, history) => async dispatch => {
  const res = await axios.post("/api/accounts/teachers", values);
  await axios
    .post("/api/teacher/login", values)
    .then(response => {
      history.push("/");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
    });
};

export const submitParentLogin = (values, history) => async dispatch => {
  await axios
    .post("/api/parent/login", values)
    .then(response => {
      history.push("/parents/main");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
      const error_login = error.response;
      dispatch({ type: FETCH_LOGIN_ERROR, payload: error.response });
    });
};

export const submitTeacherLogin = (values, history) => async dispatch => {
  await axios
    .post("/api/teacher/login", values)
    .then(response => {
      history.push("/teachers/main");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
      const error_login = error.response;
      dispatch({ type: FETCH_LOGIN_ERROR, payload: error.response });
    });
};

export const submitStudentLogin = (values, history) => async dispatch => {
  await axios
    .post("/api/student/login", values)
    .then(response => {
      history.push("/students/main");
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error.response);
      const error_login = error.response;
      dispatch({ type: FETCH_LOGIN_ERROR, payload: error.response });
    });
};

export const submitStudent = (values, history) => async dispatch => {
  const res = await axios.post("/api/students", values);

  history.push("/students");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchStudentVoices = () => async dispatch => {
  const res = await axios.get("/api/students/voicedata/");

  dispatch({ type: FETCH_VOICE, payload: res.data });
};

export const submitSource = (values, history) => async dispatch => {
  const res = await axios.post("/api/readingsources/upload", values);

  history.push("/");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllVoices = () => async dispatch => {
  const res = await axios.get("/api/admin/voiceall");

  dispatch({ type: FETCH_VOICE, payload: res.data });
};
