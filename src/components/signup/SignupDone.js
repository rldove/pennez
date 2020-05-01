import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignupDone extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <p>
          Congratulations, you have successfully signup in Pennez! {"\n"} Click
          the button below to login
        </p>

        <Link
          to="/accounts/login"
          className="waves-effect waves-light btn-large"
        >
          <i className="material-icons left">face</i>Login
        </Link>
      </div>
    );
  }
}

export default SignupDone;
