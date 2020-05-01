import React from "react";
import { renderText, renderSelect } from "./StudentField";
import { Field } from "redux-form";

const readingLevelOptions = [
  { name: "K", label: "K" },
  { name: "1", label: "1" },
  { name: "2", label: "2" },
  { name: "3", label: "3" },
  { name: "4", label: "4" },
  { name: "5", label: "5" },
  { name: "6", label: "6" },
  { name: "7", label: "7" },
  { name: "8", label: "8" }
];

const lexileOptions = [
  { name: "N/A", label: "N/A" },
  { name: "120-295", label: "120-295" },
  { name: "170-545", label: "170-545" },
  { name: "415-760", label: "415-760" },
  { name: "635-950", label: "635-950" },
  { name: "770-1080", label: "770-1080" },
  { name: "855-1165", label: "855-1165" },
  { name: "925-1235", label: "925-1235" },
  { name: "985-1295", label: "985-1295" }
];

const StudentInfo = () => {
  return (
    <div>
      <h4>Student Account Setup</h4>
      <div className="row">
        <Field
          key="firstName"
          input_id="first_name"
          htmlFor="first_name"
          type="text"
          label="Student First Name"
          name="firstName"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="lastName"
          input_id="last_name"
          htmlFor="last_name"
          type="text"
          label="Student Last Name"
          name="lastName"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>

      <div className="row">
        <Field
          key="firstName_lastName_teacher"
          input_id="firstName_lastName_teacher"
          htmlFor="firstName_lastName_teacher"
          type="text"
          label="First Name and Last Name of Teacher"
          name="firstName_lastName_teacher"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="currentGradeLevel"
          input_id="currentGradeLevel"
          htmlFor="currentGradeLevel"
          type="text"
          label="Current Grade Level"
          name="currentGradeLevel"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="schoolDistrictName"
          input_id="schoolDistrictName"
          htmlFor="schoolDistrictName"
          type="text"
          label="School District Name"
          name="schoolDistrictName"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
      <div className="row">
        <Field
          key="state"
          input_id="state"
          htmlFor="state"
          type="text"
          label="State"
          name="state"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="zipCode"
          input_id="zipCode"
          htmlFor="zipCode"
          type="Number"
          label="Zip Code"
          name="zipCode"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>

      <div className="row">
        <Field
          name="lexileReadingLevel"
          label="Lexile Reading Level"
          component={renderSelect}
          options={lexileOptions}
        />
        <Field
          name="readingGradeLevel"
          label="Reading Grade Level"
          component={renderSelect}
          options={readingLevelOptions}
        />
      </div>

      <div className="row">
        <Field
          key="username"
          input_id="username"
          htmlFor="username"
          type="text"
          label="Username"
          name="username"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
        <Field
          key="password"
          input_id="password"
          htmlFor="password"
          type="text"
          label="Password"
          name="password"
          div_className="input-field col s6"
          input_class="validate"
          component={renderText}
        />
      </div>
    </div>
  );
};

export default StudentInfo;
