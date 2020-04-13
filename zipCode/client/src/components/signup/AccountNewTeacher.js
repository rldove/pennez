// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import TeacherForm from "./FormTeacher";
import FormTeacherReview from "./FormTeacherReview";

class TeacherNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <FormTeacherReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <TeacherForm
        onTeacherSubmit={() => this.setState({ showFormReview: true })}
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
  form: "TeacherForm"
})(TeacherNew);
