// SurveyNew shows SurveyForm and SurveyReview
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import LoginForm from "./AccountLoginForm";
import AccountLoginOption from "./AccountLoginOption";

class AccountLogin extends Component {
  state = { showLoginOption: false };

  renderContent() {
    if (this.state.showLoginOption === true) {
      return (
        <AccountLoginOption
          onCancelLogin={() => this.setState({ showLoginOption: false })}
        />
      );
    }

    return (
      <LoginForm
        onLoginSubmit={() => this.setState({ showLoginOption: true })}
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
  form: "LoginForm"
})(AccountLogin);
