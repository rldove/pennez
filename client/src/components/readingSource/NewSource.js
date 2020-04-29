import React, { Component } from "react";
import { reduxForm } from "redux-form";
import SourceForm from "./SourceForm";
import SourceFormReview from "./SourceFormReview";

class SourceNew extends Component {
  state = { showSourceFormReview: false };

  renderContent() {
    if (this.state.showSourceFormReview === true) {
      return (
        <SourceFormReview
          onSourceCancel={() => this.setState({ showSourceFormReview: false })}
        />
      );
    }
    return (
      <SourceForm
        onSourceSubmit={() => this.setState({ showSourceFormReview: true })}
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
  form: "SourceForm"
})(SourceNew);
