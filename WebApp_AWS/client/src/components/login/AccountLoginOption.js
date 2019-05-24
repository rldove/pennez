// SurveyFormReview shows users their form inputs for review
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../actions";

class AccountLoginOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      errorLogin: ""
    };
    this.checkstates = this.checkstates.bind(this);
    this.deleteError = this.deleteError.bind(this);
  }

  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }

  deleteError() {
    this.setState({
      errorLogin: "123"
    });
  }

  componentDidMount() {
    this.props.submitParentLogin(
      this.props.formLoginValues,
      this.props.history
    );
    let status_login = false;
    setTimeout(() => {
      this.setState({
        errorLogin1: this.props.errorLogin
      });
      if (this.state.errorLogin1 === "Unauthorized") {
        console.log("error1-parent");
        this.props.submitTeacherLogin(
          this.props.formLoginValues,
          this.props.history
        );
        setTimeout(() => {
          this.setState({
            errorLogin2: this.props.errorLogin
          });
          if (this.state.errorLogin2 === "Unauthorized") {
            console.log("error2-teacher");
            this.props.submitStudentLogin(
              this.props.formLoginValues,
              this.props.history
            );
            setTimeout(() => {
              this.setState({
                errorLogin3: this.props.errorLogin
              });
              if (this.state.errorLogin3 === "Unauthorized") {
                console.log("error3 - student");
                console.log(status_login);
                this.setState({
                  errorLogin: "Unauthorized"
                });
              } else {
                let status_login = true;
                console.log(status_login);
              }
            }, 500);
          } else {
            let status_login = true;
            console.log(status_login);
          }
        }, 500);
      } else {
        let status_login = true;
        console.log(status_login);
      }
    }, 500);
  }

  renderStatus() {
    if (!this.state.errorLogin) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
    return (
      <div>
        <p style={{ fontSize: 24, textAlign: "center", color: "red" }}>
          {[this.props.errorLogin, " Username or Password, Please try again!"]}
        </p>

        <button
          className="red lighten-2 center white-text btn-flat"
          onClick={this.props.onCancelLogin}
        >
          Back
        </button>
      </div>
    );
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div className="card">
          <div className="card-content">
            <span
              className="card-title"
              style={{ textAlign: "center", color: "teal", fontSize: 30 }}
            >
              Login......
            </span>
          </div>
          <div className="card-action">
            <div
              className="container"
              style={{ marginTop: 100, marginBottom: 100 }}
            >
              <p>{this.renderStatus()}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  if (state.loginError) {
    return {
      formLoginValues: state.form.LoginForm.values,
      errorLogin: state.loginError.statusText
    };
  }
  return {
    formLoginValues: state.form.LoginForm.values
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(AccountLoginOption));
