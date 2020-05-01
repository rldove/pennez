import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      firstName: this.props.profile.firstName,
      familyName: this.props.profile.familyName,

      email: this.props.profile.email,
      phoneNum: this.props.profile.phoneNum,

      addressStreet: this.props.profile.addressStreet,
      addressCity: this.props.profile.addressCity,
      addressState: this.props.profile.addressState,
      addressZipcode: this.props.profile.addressZipcode,

      username: this.props.profile.username,
      password: this.props.profile.password,
      keyId: this.props.profile._id,

      schoolType: this.props.profile.schoolType
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
      .post("/api/teachers/profile/edit", this.state)
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
      newStudent: this.props.profile
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
          data-target={this.props.profile.firstName}
          key={this.props.profileKey}
          id={this.props.profileKey}
          style={{ color: "teal" }}
        >
          <i className="material-icons left">create</i>
          Edit Profile
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.profile.firstName}
          className="modal"
          style={{ marginTop: 25, width: 900 }}
        >
          <div className="modal-content">
            <h4>Edit Profile</h4>

            <div className="row">
              <div className=" col s12 m12 l12">
                <div className="row">
                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.firstName}
                    >
                      First Name
                    </label>
                    <input
                      value={this.state.firstName}
                      onChange={e => {
                        this.setState({ firstName: e.target.value });
                      }}
                      id={this.props.profile.firstName}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.familyName}
                    >
                      Family Name
                    </label>
                    <input
                      value={this.state.familyName}
                      onChange={e => {
                        this.setState({ familyName: e.target.value });
                      }}
                      id={this.props.profile.familyName}
                      type="text"
                      className="validate"
                    />
                  </div>
                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.email}
                    >
                      Email
                    </label>
                    <input
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                      id={this.props.profile.email}
                      type="text"
                      className="validate"
                    />
                  </div>
                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.phoneNum}
                    >
                      Phone Number
                    </label>
                    <input
                      value={this.state.phoneNum}
                      onChange={e => {
                        this.setState({ phoneNum: e.target.value });
                      }}
                      id={this.props.profile.phoneNum}
                      type="text"
                      className="validate"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.addressStreet}
                    >
                      Street Address
                    </label>
                    <input
                      value={this.state.addressStreet}
                      onChange={e => {
                        this.setState({
                          addressStreet: e.target.value
                        });
                      }}
                      id={this.props.profile.addressStreet}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.addressCity}
                    >
                      City
                    </label>
                    <input
                      value={this.state.addressCity}
                      onChange={e => {
                        this.setState({ addressCity: e.target.value });
                      }}
                      id={this.props.profile.addressCity}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.addressState}
                    >
                      State
                    </label>
                    <input
                      value={this.state.addressState}
                      onChange={e => {
                        this.setState({ addressState: e.target.value });
                      }}
                      id={this.props.profile.addressState}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s3">
                    <label
                      className="active"
                      htmlFor={this.props.profile.addressZipcode}
                    >
                      ZipCode
                    </label>
                    <input
                      value={this.state.addressZipcode}
                      onChange={e => {
                        this.setState({ addressZipcode: e.target.value });
                      }}
                      id={this.props.profile.addressZipcode}
                      type="number"
                      className="validate"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col s4">
                    <label
                      className="active"
                      htmlFor={this.props.profile.schoolType}
                    >
                      School Type
                    </label>
                    <input
                      value={this.state.schoolType}
                      onChange={e => {
                        this.setState({ schoolType: e.target.value });
                      }}
                      id={this.props.profile.schoolType}
                      type="text"
                      className="validate"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s6">
                    <label
                      className="active"
                      htmlFor={this.props.profile.username}
                    >
                      Username
                    </label>
                    <input
                      value={this.state.username}
                      onChange={e => {
                        this.setState({ username: e.target.value });
                      }}
                      id={this.props.profile.username}
                      type="text"
                      className="validate"
                    />
                  </div>

                  <div className="col s6">
                    <label
                      className="active"
                      htmlFor={this.props.profile.password}
                    >
                      Password
                    </label>
                    <input
                      value={this.state.password}
                      onChange={e => {
                        this.setState({ password: e.target.value });
                      }}
                      id={this.props.profile.password}
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

export default ProfileEdit;
