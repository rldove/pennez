import React, { Component } from "react";
import { Link } from "react-router-dom";
import LegalPolicyContent from "./LegalPolicyContent";

class LegalPolicy extends Component {
  constructor() {
    super();
    this.state = { isChecked: false };
    this.handleChecked = this.handleChecked.bind(this); // set this, because you need get methods from CheckBox
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    if (this.state.isChecked === true) {
      return (
        <div className="container">
          <div className="row">
            <LegalPolicyContent />
          </div>

          <div className="row">
            <form>
              <p>
                <label>
                  <input
                    type="checkbox"
                    className="filled-in"
                    onChange={this.handleChecked}
                  />
                  <span>I have read the policy</span>
                </label>
              </p>

              <Link to="/students" className="red btn-flat white-text">
                Cancel
              </Link>
              <Link
                to="/students/new"
                className="teal btn-flat right white-text"
              >
                Next
                <i className="material-icons right">done</i>
              </Link>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <LegalPolicyContent />
        <form>
          <p>
            <label>
              <input
                type="checkbox"
                className="filled-in"
                onChange={this.handleChecked}
              />
              <span>I have read the policy</span>
            </label>
          </p>

          <Link to="/students" className="red btn-flat white-text">
            Cancel
          </Link>
          <Link
            to="/students/new"
            className="teal btn-flat right white-text disabled"
          >
            Next
            <i className="material-icons right">done</i>
          </Link>
        </form>
      </div>
    );
  }
}

export default LegalPolicy;
