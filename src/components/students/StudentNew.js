// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import StudentForm from "./StudentForm";
import StudentFormReview from "./StudentFormReview";

class StudentNew extends Component {
  state = { showStudentFormReview: false };

  renderContent() {
    if (this.state.showStudentFormReview === true) {
      return (
        <StudentFormReview
          onStudentCancel={() =>
            this.setState({ showStudentFormReview: false })
          }
        />
      );
    }
    return (
      <StudentForm
        onStudentSubmit={() => this.setState({ showStudentFormReview: true })}
      />
    );
  }

  constructor(props) {
    super(props);

    this.state = { new: true };
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default reduxForm({
  form: "StudentForm"
})(StudentNew);
