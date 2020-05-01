import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "../surveys/SurveyField";
import loginFormFields from "./loginFormFields";
import _ from "lodash";
// import * as actions from "../../actions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.checkstates = this.checkstates.bind(this);
  }

  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }

  render() {
    return (
      <div className="container" style={{ marginBottom: 1500 }}>
        <div className="col s3 offset-s6">
          <div className="card white">
            <div className="card-content">
              <span
                className="card-title"
                style={{ textAlign: "center", color: "teal", fontSize: 30 }}
              >
                Welcome to Pennez
              </span>
              <form
                className="col s3 offset-s6"
                onSubmit={this.props.handleSubmit(this.props.onLoginSubmit)}
              >
                <Field
                  key="username"
                  type="text"
                  label="User Name"
                  name="username"
                  component={SurveyField}
                />
                <Field
                  key="password"
                  type="password"
                  label="Password"
                  name="password"
                  component={SurveyField}
                />
                <Link to="/" className="red btn-flat white-text">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="teal btn-flat right white-text"
                >
                  Next
                  <i className="material-icons right">done</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(loginFormFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "LoginForm",
  destroyOnUnmount: false
})(LoginForm);
