import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import ParentInfo from "./ParentInfo";
import ParentSchema from "./ParentSchema";

// import * as actions from "../../actions";
const _ = require("underscore");

class ParentForm extends Component {
  render() {
    return (
      <div>
        <form
          className="col s12"
          onSubmit={this.props.handleSubmit(this.props.onParentSubmit)}
        >
          <ParentInfo />
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

  _.each(ParentSchema, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "ParentForm",
  destroyOnUnmount: false
})(ParentForm);
