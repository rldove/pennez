// SurveyField contains logic to render a single label and text input
import React from "react";
import Select from "react-select";

const controlStyles = {
  Height: "120px",
  padding: "5px"
};

export const renderText = ({
  input,
  input_id,
  label,
  type,
  div_className,
  htmlFor,
  input_class,
  meta: { error, touched }
}) => {
  return (
    <div className={div_className}>
      <input
        id={input_id}
        {...input}
        type={type}
        className={input_class}
        style={{ marginBottom: "5px" }}
      />
      <label htmlFor={htmlFor}>{label}</label>
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

export const renderSelect = ({
  input,
  label,
  name,
  options,
  meta: { touched, error }
}) => (
  <div className="input-field col s6" style={controlStyles}>
    <Select
      {...input}
      options={options}
      name={name}
      value={input.value.name}
      onChange={value => input.onChange(value.name)}
      onBlur={() => input.onBlur()}
    />
    <label>{label}</label>
    <div className="red-text">{touched && error}</div>
  </div>
);
