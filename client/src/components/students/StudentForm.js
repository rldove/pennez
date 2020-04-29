// SurveyForm shows a form for a user to add input
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import studentSchema from "./studentSchema";
import StudentInfo from "./StudentInfo";
// import * as actions from "../../actions";
const _ = require("underscore");

class StudentForm extends Component {
  render() {
    return (
      <div className="container">
        <form
          className="col s12"
          onSubmit={this.props.handleSubmit(this.props.onStudentSubmit)}
        >
          <StudentInfo />
          <Link to="/students" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(studentSchema, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "StudentForm",
  destroyOnUnmount: false
})(StudentForm);
