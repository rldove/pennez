import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchParentProfile } from "../../actions";
import ProfileEdit from "./ProfileEdit";

class ParentProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.checkstates = this.checkstates.bind(this);
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

  checkstates() {
    console.log(this.props);
  }

  componentDidMount() {
    this.props.fetchParentProfile();
    this.getStatus();
  }

  renderProfile() {
    return this.props.profile.map(profile => {
      const profileId = profile._id;
      return (
        <div className="card" key={profile._id}>
          <div className="card-content teal-text">
            <span className="card-title">
              Name: {profile.firstName}, {profile.familyName}
            </span>
            <p>Username: {profile.username}</p>
            <p>Email Address: {profile.email}</p>
            <p>Phone Number: {profile.phoneNum}</p>
            <p>
              Street Address: {profile.addressStreet}, City:{" "}
              {profile.addressCity}, State: {profile.addressState}, zipcode:{" "}
              {profile.addressZipcode}
            </p>
          </div>
          <div class="card-action">
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
              <ProfileEdit
                profile={this.state[profileId]}
                profileKey={profile._id}
              />
            )}
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginBottom: 800 }}>
        <div className="row">
          <h4 style={{ color: "teal" }}>Your Profile</h4>
          <a
            href="/accounts/parentprofile"
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
  { fetchParentProfile }
)(ParentProfile);
