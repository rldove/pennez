import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class ParentEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      firstName: this.props.student.firstName,
      lastName: this.props.student.lastName,
      currentGradeLevel: this.props.student.currentGradeLevel,
      firstName_lastName_teacher: this.props.student.firstName_lastName_teacher,
      schoolDistrictName: this.props.student.schoolDistrictName,
      state: this.props.student.state,
      zipCode: this.props.student.zipCode,
      username: this.props.student.username,
      password: this.props.student.password,
      keyId: this.props.student._id
    };
    this.checkstates = this.checkstates.bind(this);
    this.VoiceDelete = this.VoiceDelete.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  handleCommentChange(event) {
    this.setState({ commentContent: event.target.value });
  }

  submitEdit() {
    axios
      .post("/api/students/profile/edit", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }

  VoiceDelete(e) {
    axios
      .post("/api/aws/transcribe/delete", e)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    const options = {
      inDuration: 200,
      outDuration: 200,
      opacity: 0.4,
      dismissible: true,
      startingTop: "10%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
    // setTimeout(() => {
    //   this.FetchTransResults();
    //   this.OriginalTextShow();
    // }, 5000);
    this.setState({
      newStudent: this.props.student
    });
  }

  render() {
    const divStyle = {
      display: this.state.comment == "none" ? "block" : "none"
    };
    return (
      <div>
        <a
          className="waves-effect waves-light btn white modal-trigger"
          data-target={this.props.student.firstName}
          key={this.props.studentKey}
          id={this.props.studentKey}
          style={{ color: "teal" }}
        >
          <i className="material-icons left">create</i>
          Edit Profile
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.student.firstName}
          className="modal"
          style={{ marginTop: 25, width: 900 }}
        >
          <div className="modal-content">
            <h4>Edit Student Profile</h4>

            <div className="row">
              <div className=" col s12 m12 l12">
                <div className="row">
                  <div className="col s4">
                    <label
                      className="active"
                      htmlFor={this.props.student.firstName}
                    >
                      First Name
                    </label>
                    <input
                      value={this.state.firstName}
                      onChange={e => {
                        this.setState({ firstName: e.target.value });
                      }}
                      id={this.props.student.firstName}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s4">
                    <label
                      className="active"
                      htmlFor={this.props.student.lastName}
                    >
                      Last Name
                    </label>
                    <input
                      value={this.state.lastName}
                      onChange={e => {
                        this.setState({ lastName: e.target.value });
                      }}
                      id={this.props.student.lastName}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s4">
                    <label
                      className="active"
                      htmlFor={this.props.student.currentGradeLevel}
                    >
                      Current Grade Level
                    </label>
                    <input
                      value={this.state.currentGradeLevel}
                      onChange={e => {
                        this.setState({ currentGradeLevel: e.target.value });
                      }}
                      id={this.props.student.currentGradeLevel}
                      type="text"
                      className="validate"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.student.firstName_lastName_teacher}
                    >
                      Name of Teacher
                    </label>
                    <input
                      value={this.state.firstName_lastName_teacher}
                      onChange={e => {
                        this.setState({
                          firstName_lastName_teacher: e.target.value
                        });
                      }}
                      id={this.props.student.firstName_lastName_teacher}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.student.schoolDistrictName}
                    >
                      School District Name
                    </label>
                    <input
                      value={this.state.schoolDistrictName}
                      onChange={e => {
                        this.setState({ schoolDistrictName: e.target.value });
                      }}
                      id={this.props.student.schoolDistrictName}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.student.state}
                    >
                      State
                    </label>
                    <input
                      value={this.state.state}
                      onChange={e => {
                        this.setState({ state: e.target.value });
                      }}
                      id={this.props.student.state}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.student.zipCode}
                    >
                      ZipCode
                    </label>
                    <input
                      value={this.state.zipCode}
                      onChange={e => {
                        this.setState({ zipCode: e.target.value });
                      }}
                      id={this.props.student.zipCode}
                      type="number"
                      className="validate"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s6">
                    <label
                      className="active"
                      htmlFor={this.props.student.username}
                    >
                      Username
                    </label>
                    <input
                      value={this.state.username}
                      onChange={e => {
                        this.setState({ username: e.target.value });
                      }}
                      id={this.props.student.username}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s6">
                    <label
                      className="active"
                      htmlFor={this.props.student.password}
                    >
                      Password
                    </label>
                    <input
                      value={this.state.password}
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      id={this.props.student.password}
                      type="text"
                      className="validate"
                    />
                  </div>
                </div>
              </div>
            </div>

            <a
              onClick={() => this.checkstates()}
              className="waves-effect waves-green btn-flat"
              style={{ fontSize: "20px", color: "teal" }}
            >
              state
            </a>

            <div className="modal-footer">
              <a
                className="modal-close waves-effect waves-red btn-flat"
                style={{ fontSize: "20px", color: "red" }}
              >
                Cancel
              </a>
              <a
                onClick={() => this.submitEdit()}
                herf="/"
                className="modal-close waves-effect waves-green btn-flat"
                style={{ fontSize: "20px", color: "teal" }}
              >
                Update
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ParentEditModal;
