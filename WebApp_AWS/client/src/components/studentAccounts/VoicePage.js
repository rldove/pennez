// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from "react";
import StudentVoices from "./StudentVoices";
import VoiceComment from "./VoiceComment";

class VoicePage extends Component {
  state = { showFormVoice: false };

  renderContent() {
    if (this.state.showFormVoice === true) {
      return (
        <VoiceComment
          onCancel={() => this.setState({ showFormVoice: false })}
        />
      );
    }

    return (
      <StudentVoices
        onSurveySubmit={() => this.setState({ showFormVoice: true })}
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
  voice: "VoiceClip"
})(SurveyNew);
