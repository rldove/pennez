import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import TeacherInfo from "./TeacherInfo";
import TeacherSchema from "./TeacherSchema";

// import * as actions from "../../actions";
const _ = require("underscore");

class TeacherForm extends Component {
  render() {
    return (
      <div>
        <form
          className="col s12"
          onSubmit={this.props.handleSubmit(this.props.onTeacherSubmit)}
        >
          <TeacherInfo />
          <div className="container">
            <Link to="/accounts/new" className="red btn-flat white-text">
              Cancel
            </Link>
            <button type="submit" className="teal btn-flat right white-text">
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || "");

  _.each(TeacherSchema, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "TeacherForm",
  destroyOnUnmount: false
})(TeacherForm);
