import React from "react";
import { Link } from "react-router-dom";

const AccountTypes = () => {
  return (
    <div style={{ textAlign: "center", marginBottom: 1000 }}>
      <div className="card">
        <div className="card-content">
          <span className="card-title">
            For which of the following are you creating an account?
          </span>
        </div>
        <div className="card-action">
          <div className="row">
            <Link
              to="/accounts/new/parent"
              className="btn-large teal lighten-2 btn-flat center white-text"
              style={{ marginTop: "50px" }}
            >
              Partent
              <i className="material-icons right">face</i>
            </Link>
          </div>
          <div className="row">
            <Link
              to="/accounts/new/teacher"
              className="btn-large teal lighten-2 btn-flat center white-text"
            >
              Teacher
              <i className="material-icons right">school</i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypes;
