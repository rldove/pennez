import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import ParentInfo from "./ParentInfo";
import ParentSchema from "./ParentSchema";
import Background from '/Users/booboo/Documents/CPT/pennez/zipCode/client/src/components/signup/chalkboard.png'
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';
var sectionStyle = {
  width: "98%",
  height: "750px",
  backgroundImage: `url(${Background})`
};
function onCheck(event) {
    console.log('onCheck: ', event); // always called
}
function onLinkClick(event) {
    console.log('onLinkClick'); // never called
}
const label = (
    <span>I have read and agree to the&nbsp;
        <a
            href="/"
            target="_blank"
            onClick={onLinkClick}
        >
      Terms and Conditions
    </a>
  </span>
)

render(
    <MuiThemeProvider>
        <Checkbox label={label} onCheck={onCheck} />
    </MuiThemeProvider>,
    document.getElementById('app')
)

// import * as actions from "../../actions";
const _ = require("underscore");

class ParentForm extends Component {
  render() {
    return (
        <div style={sectionStyle}>

        <div>

        <form
          className="col s12"
          onSubmit={this.props.handleSubmit(this.props.onParentSubmit)}
        >

          <ParentInfo />

            <br/>
            <br/>
          <div className="container2">
            <Link to="/accounts/new" className="red btn-flat white-text">
              Cancel
            </Link>
            <button type="submit" className="teal btn-flat white-text">
              Next
              <i className="material-icons right">done</i>
            </button>
          </div>
        </form>
      </div>
        </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || "");

  _.each(ParentSchema, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "ParentForm",
  destroyOnUnmount: false
})(ParentForm);
