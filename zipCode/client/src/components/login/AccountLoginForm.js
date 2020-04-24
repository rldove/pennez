import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "../surveys/SurveyField";
import loginFormFields from "./loginFormFields";
import _ from "lodash";
import logimg from "./background.png";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
// import * as actions from "../../actions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      accountType: 'student'
    };
    // this.checkstates = this.checkstates.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  onRadioChange (e) {
    console.log(e);
    this.setState({
      accountType: e.target.value
    });
    console.log(this.state.accountType);
  }

  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }



  render() {
    return (
      //  <div className="container" style={{ marginBottom: 1500 }}>
      //     <div className="col s3 offset-s6">
      //       <div className="card white">
      // <div className="card-content"> 
      <div style={{
        backgroundImage: "url(" + logimg + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}>
        <div style={{
          border: '3px solid green',
          position: 'absolute',
          left: '25%',
          top: '30%',
          width: '50%',
          height: '55%',
          textAlign: 'center'
        }}>
          <span
            className="card-title"
            style={{
              textAlign: "center", color: "white", fontSize: 30,
              verticalAlign: 'middle',
            }}
          >
                Log in
          </span>

          <form
            className="col s3 offset-s6"
            onSubmit={this.props.handleSubmit(this.props.onLoginSubmit)}
          >
            <div className="ui-radio on btn-large teal lighten-2 btn-flat center white-text" >
            
              <label className="ui-radio on btn-large teal lighten-2 btn-flat center white-text">
              <input type="radio"
                value='teacher'
                name= "accountType"
                key="accountType"
                checked={this.state.accountType==='teacher'}
                onChange={this.onRadioChange}></input>
              <span className="radio-text">Student</span>
              </label>
              <label className="ui-radio on btn-large teal lighten-2 btn-flat center white-text">
              <input 
                value='student'
                type="radio"
                name= "accountType"
                key="accountType"
                checked={this.state.accountType==='student'}
                onChange={this.onRadioChange}></input>
              <span className="radio-text">Teacher</span>
              </label>
            </div>
            <Field
            name="accountType"
            value={this.state.accountType}
            />

            <Field
              key="username"
              type="text"
              label="Email Address"
              name="username"
              component={SurveyField}
            />
            <Field
            
              key="password"
              type="password"
              label="Password"
              name="password"
              component={SurveyField}
            />
            {/* <Link to="/" className="red btn-flat white-text">
              Cancel
                </Link> */}
            <button
              type="submit"
              className="teal btn-flat  white-text"
            >
              Log in
                  {/* <i className="material-icons right">done</i> */}
            </button>
            <br />
            <a className="grey-text text-lighten-3" href="new">
              Create Account
              </a>
          </form>

        </div>
      </div>
      //  </div> 
    );
  }
}

function validate(values) {

  const errors = {};

  _.each(loginFormFields, ({ name }) => {
    console.log('name:: ' + JSON.stringify(values[name]));
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });
  return errors;
}

export default reduxForm({
  validate,
  form: "LoginForm",
  destroyOnUnmount: false
})(LoginForm);
