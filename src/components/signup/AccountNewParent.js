// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import ParentForm from "./FormParent";
import FormParentReview from "./FormParentReview";

class ParentNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview === true) {
      return (
        <FormParentReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <ParentForm
        onParentSubmit={() => this.setState({ showFormReview: true })}
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
  form: "ParentForm"
})(ParentNew);
