// SurveyField contains logic to render a single label and text input
import React from "react";
import { Input } from "react-materialize";

export default ({
  input,
  input_id,
  label,
  type,
  input_class,
  meta: { error, touched }
}) => {
  return (
    <div>
      <Input
        {...input}
        s={12}
        id={input_id}
        label={label}
        type={type}
        className={input_class}
        defaultValue="2"
      >
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </Input>
      <div className="red-text">{touched && error}</div>
    </div>
  );
};

class SelectBox1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "select" };
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="select1">Select1</label>
        <select
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          className="form-control"
        >
          <option value="select">Select an Option</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
        </select>
      </div>
    );
  }
}

// a select with dynamically created options
const options = [
  "Select an Option",
  "First Option",
  "Second Option",
  "Third Option"
];

class SelectBox2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "Select an Option" };
  }
  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="select2">Select2</label>
        <select
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          className="form-control"
        >
          {options.map(option => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 col-sm-push-4">
          <SelectBox1 />
          <SelectBox2 />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
