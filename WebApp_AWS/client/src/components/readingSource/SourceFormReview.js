import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import { withRouter } from "react-router";
import * as actions from "../../actions";

const SourceFormReview = ({ onCancel, formValues, submitSource, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name} className="container">
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="container">
      <h5>please confirm your entries</h5>
      {reviewFields}
      <button className="teal darken-1 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button
        onClick={() => submitSource(formValues, history)}
        className="teal darken-1 btn-flat right white-text"
      >
        Send Source
        <i className="material-icons right">check</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    formValues: state.form.SourceForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SourceFormReview));
