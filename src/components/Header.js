import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Header extends Component {
  resetHref() {
    console.log("onClick");
  }

  renderContent() {
    // console.log(this.props.auth.auth);
    switch (this.props.auth.auth) {
      case null:
        return;
      case false:
        return (
          <nav>
            <div className="nav-wrapper white">
              <Link className="brand-logo" style={{ color: "teal" }} to="/">
                <img
                  src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
                  alt="pennez"
                  height="75"
                  width="80"
                />
              </Link>
              <div>
                <ul className="right">
                  <li>
                    <a href="/accounts/new" style={{ color: "teal" }}>
                      Sign up
                    </a>
                  </li>
                  <li>
                    <a href="/accounts/login" style={{ color: "teal" }}>
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );

      default:
        if (this.props.auth.auth.accountType === "Student") {
          return (
            <nav>
              <div className="nav-wrapper white">
                <Link
                  className="brand-logo"
                  style={{ color: "teal" }}
                  to="/students/main"
                >
                  <img
                    src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
                    alt="pennez"
                    height="75"
                    width="80"
                  />
                </Link>
                <div>
                  <ul className="right">
                    <li>
                      <a href="/accounts/test" style={{ color: "teal" }}>
                        Reading Test
                      </a>
                    </li>
                    <li>
                      <a href="/students/profile" style={{ color: "teal" }}>
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="/api/logout" style={{ color: "teal" }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );
        } else if (this.props.auth.auth.accountType === "Admin") {
          return (
            <nav>
              <div className="nav-wrapper white">
                <Link className="brand-logo" style={{ color: "teal" }} to="/">
                  <img
                    src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
                    alt="pennez"
                    height="75"
                    width="80"
                  />
                </Link>
                <div>
                  <ul className="right">
                    <li>
                      <a href="/allStudentVoice" style={{ color: "teal" }}>
                        All Student Data
                      </a>
                    </li>
                    <li>
                      <a href="/source/upload" style={{ color: "teal" }}>
                        Source
                      </a>
                    </li>
                    <li>
                      <a href="/accounts/profile" style={{ color: "teal" }}>
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="/api/logout" style={{ color: "teal" }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );
        } else if (this.props.auth.auth.accountType === "Teacher") {
          return (
            <nav>
              <div className="nav-wrapper white">
                <Link
                  className="brand-logo"
                  style={{ color: "teal" }}
                  to="/teachers/main"
                >
                  <img
                    src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
                    alt="pennez"
                    height="75"
                    width="80"
                  />
                </Link>
                <div>
                  <ul className="right">
                    <li>
                      <a href="/studentVoice" style={{ color: "teal" }}>
                        Student Data
                      </a>
                    </li>
                    <li>
                      <a href="/students/teacher" style={{ color: "teal" }}>
                        Student Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="/accounts/teacherprofile"
                        style={{ color: "teal" }}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a href="/api/logout" style={{ color: "teal" }}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          );
        }
        return (
          <nav>
            <div className="nav-wrapper white">
              <Link
                className="brand-logo"
                style={{ color: "teal" }}
                to="/parents/main"
              >
                <img
                  src="https://s3.amazonaws.com/pennezaudio/Pennez.Logos_final.web-01.png"
                  alt="pennez"
                  height="75"
                  width="80"
                />
              </Link>
              <div>
                <ul className="right">
                  <li>
                    <a href="/studentVoice" style={{ color: "teal" }}>
                      Student Data
                    </a>
                  </li>
                  <li>
                    <a href="/students" style={{ color: "teal" }}>
                      Student Profile
                    </a>
                  </li>
                  <li>
                    <a href="/accounts/parentprofile" style={{ color: "teal" }}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="/api/logout" style={{ color: "teal" }}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(auth) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
