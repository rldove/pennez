import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Footer from "./Footer";
import Landing from "./Landing";

import SurveyDashboard from "./SurveyDashboard";
import SurveyNew from "./surveys/SurveyNew";

import ParentProfile from "./parentAccounts/ParentProfile";
import TeacherProfile from "./teacherAccounts/TeacherProfile";
import TeacherStudentList from "./teacherAccounts/TeacherStudentList";

import AccountNew from "./signup/AccountNew";
import ParentNew from "./signup/AccountNewParent";
import TeacherNew from "./signup/AccountNewTeacher";
import AccountLogin from "./login/AccountLoginNew";
import SignupDone from "./signup/SignupDone";
import SupervisorMainPage from "./accounts/SupervisorMainPage";

import StudentDashboard from "./StudentDashboard";
import LegalPolicy from "./students/LegalPolicy";
import StudentNew from "./students/StudentNew";

import TestPage from "./voiceTests/TestPage";
import StudentVoices from "./studentAccounts/StudentVoices";
import StudentProfile from "./studentAccounts/StudentProfile";
import StudentMainPage from "./studentAccounts/StudentMainPage";

import ReadingSource from "./readingSource/NewSource";
import AllStudentVoices from "./admin/AllStudentVoices";
import RangeStudentVoices from "./accounts/StudentVoices";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={SurveyDashboard} />
          <Route exact path="/surveys/new" component={SurveyNew} />
          <Route exact path="/accounts/new" component={AccountNew} />
          <Route exact path="/accounts/new/parent" component={ParentNew} />
          <Route exact path="/accounts/new/teacher" component={TeacherNew} />
          <Route exact path="/accounts/signup/done" component={SignupDone} />
          <Route exact path="/accounts/login" component={AccountLogin} />
          <Route
            exact
            path="/accounts/parentprofile"
            component={ParentProfile}
          />
          <Route
            exact
            path="/accounts/teacherprofile"
            component={TeacherProfile}
          />

          <Route
            exact
            path="/students/teacher"
            component={TeacherStudentList}
          />

          <Route exact path="/teachers/main" component={SupervisorMainPage} />
          <Route exact path="/parents/main" component={SupervisorMainPage} />

          <Route exact path="/students" component={StudentDashboard} />
          <Route exact path="/legalPolicy" component={LegalPolicy} />
          <Route exact path="/students/new" component={StudentNew} />

          <Route exact path="/accounts/test" component={TestPage} />
          <Route exact path="/accounts/voices" component={StudentVoices} />
          <Route exact path="/students/profile" component={StudentProfile} />
          <Route exact path="/students/main" component={StudentMainPage} />
          <Route exact path="/source/upload" component={ReadingSource} />

          <Route exact path="/studentVoice" component={RangeStudentVoices} />
          <Route exact path="/allStudentVoice" component={AllStudentVoices} />

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
