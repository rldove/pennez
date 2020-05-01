import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formTeacherField from "./formParentField";
import { withRouter } from "react-router";
import * as actions from "../../actions";

const FormTeacherReview = ({
  onCancel,
  formValues,
  submitTeacherForm,
  history
}) => {
  const reviewFields = _.map(formTeacherField, ({ name, label }) => {
    return (
      <div key={name} className="row">
        <label>{label}</label>
        {"   "} {formValues[name]}
      </div>
    );
  });

  return (
    <div className="container">
      <h5>Please Review Your Entries</h5>
      {reviewFields}
      <button className="red white-text btn-flat" onClick={onCancel}>
        Back
        <i className="material-icons right">arrow_back</i>
      </button>
      <button
        onClick={() => submitTeacherForm(formValues, history)}
        className="teal darken-1 btn-flat right white-text"
      >
        Confirm
        <i className="material-icons right">check</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues: state.form.TeacherForm.values
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    actions
  )(FormTeacherReview)
);
