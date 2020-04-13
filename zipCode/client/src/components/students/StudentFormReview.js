// SurveyFormReview shows users their form inputs for review
import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import studentSchema from "./studentSchema";
import { withRouter } from "react-router";
import * as actions from "../../actions";

const StudentFormReview = ({
  onStudentCancel,
  studentformValues,
  submitStudent,
  history
}) => {
  const reviewFields = _.map(studentSchema, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{studentformValues[name]}</div>
      </div>
    );
  });

  return (
    <div className="container">
      <h5>please confirm your entries</h5>
      {reviewFields}
      <button
        className="teal darken-1 white-text btn-flat"
        onClick={onStudentCancel}
      >
        Back
      </button>
      <button
        onClick={() => submitStudent(studentformValues, history)}
        className="teal darken-1 btn-flat right white-text"
      >
        Submit
        <i className="material-icons right">check</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    studentformValues: state.form.StudentForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(StudentFormReview));
