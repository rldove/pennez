// SurveyFormReview shows users their form inputs for review
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../actions";

export const Atlas = ({ voiceInfo, submitVoiceClip, history }) => {
  return (
    <div>
      <button
        onClick={() => console.log(submitVoiceClip)}
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
    voiceInfo: state
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Atlas));
