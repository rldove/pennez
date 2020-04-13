import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentProfile } from "../../actions";
import StudentEditModal from "./StudentEditModal";

class StudentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }

  getStatus() {
    setTimeout(() => {
      this.props.profile.map(profile => {
        this.setState({
          [profile._id]: profile
        });
      });
    }, 1000);
  }

  componentDidMount() {
    this.props.fetchStudentProfile();
    this.getStatus();
  }

  renderProfile() {
    return this.props.profile.map(profile => {
      const studentId = profile._id;
      return (
        <div className="card" key={profile._id}>
          <div className="card-content teal-text">
            <span className="card-title">
              Name: {profile.firstName}, {profile.lastName}
            </span>
            <p>Username: {profile.username}</p>

            <p>Grade Level: {profile.currentGradeLevel}</p>
            <p>
              Lexile Level: {profile.lexileReadingLevel} Reading Level:{" "}
              {profile.readingGradeLevel}
            </p>
            <p>Student's Teacher: {profile.firstName_lastName_teacher}</p>
            <p>
              School District Name: {profile.schoolDistrictName}, state:{" "}
              {profile.state}, zipcode: {profile.zipCode}
            </p>
          </div>
          <div className="card-action">
            {!this.state[profile._id] ? (
              <div className="preloader-wrapper small active">
                <div className="spinner-layer spinner-teal-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            ) : (
              <StudentEditModal
                student={this.state[studentId]}
                studentKey={profile._id}
              />
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginBottom: 1000 }}>
        <div className="row">
          <h4 style={{ color: "teal" }}>Your Profile</h4>
          <a
            href="/students/profile"
            className="waves-effect waves-light btn-small teal lighten-2 right"
          >
            <i className="material-icons left">autorenew</i>
            Refresh
          </a>
        </div>

        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(
  mapStateToProps,
  { fetchStudentProfile }
)(StudentProfile);
