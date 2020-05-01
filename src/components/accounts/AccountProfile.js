import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfile } from "../../actions";

class AccountProfile extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }
  renderProfile() {
    return this.props.profile.map(profile => {
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
            <a>Edit Information</a>
            <a>Change Password</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div className="container">{this.renderProfile()}</div>;
  }
}

function mapStateToProps({ profile }) {
  return { profile };
}

export default connect(
  mapStateToProps,
  { fetchProfile }
)(AccountProfile);
