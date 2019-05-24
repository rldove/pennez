import React from "react";
import { renderText, renderSelect } from "./ParentField";
import { Field } from "redux-form";

const accountTypeOptions = [
  { name: "Parent", label: "Parent" },
  { name: "Teacher", label: "Teacher" }
];

const TeacherInfo = () => {
  return (
    <div className="container">
      <h4>Teacher Registration Form</h4>
      <div className="row">
        <Field
          key="username1"
          input_id="user_name"
          htmlFor="user_name"
          type="text"
          label="Username"
          name="username"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="password1"
          input_id="password"
          htmlFor="password"
          type="password"
          label="Password"
          name="password"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>

      <div className="row">
        <Field
          key="firstName1"
          input_id="first_name"
          htmlFor="first_name"
          type="text"
          label="First Name"
          name="firstName"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="familyName1"
          input_id="family_Name"
          htmlFor="family_Name"
          type="text"
          label="Family Name"
          name="familyName"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          name="accountType"
          label="Select Account Type Again"
          component={renderSelect}
          options={accountTypeOptions}
        />
      </div>

      <div className="row">
        <Field
          key="email1"
          input_id="email"
          htmlFor="email"
          type="text"
          label="Email Address"
          name="email"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="phoneNum1"
          input_id="phoneNum"
          htmlFor="phoneNum"
          type="number"
          label="Phone Number"
          name="phoneNum"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="addressStreet1"
          input_id="addressStreet"
          htmlFor="addressStreet"
          type="text"
          label="Street Address"
          name="addressStreet"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="addressCity1"
          input_id="addressCity"
          htmlFor="addressCity"
          type="text"
          label="City"
          name="addressCity"
          div_className="input-field col s4"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="addressState1"
          input_id="addressState"
          htmlFor="addressState"
          type="text"
          label="State"
          name="addressState"
          div_className="input-field col s4"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="addressZipcode1"
          input_id="addressZipcode"
          htmlFor="addressZipcode"
          type="number"
          label="ZipCode"
          name="addressZipcode"
          div_className="input-field col s4"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="schoolType1"
          input_id="schoolType"
          htmlFor="schoolType"
          type="text"
          label="School Type"
          name="schoolType"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
    </div>
  );
};

export default TeacherInfo;
