import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Footer extends Component {
  render() {
    return (
      <footer className="page-footer teal lighten-2" style={{ marginTop: 500 }}>
        <div>
          <div className="row">
            <div className="col l6 s3 offset-s3" style={{ marginLeft: 200 }}>
              <h5 className="white-text">PENNEZ</h5>
              <p className="grey-text text-lighten-4">Pennez</p>
            </div>
            <div className="col l3 s3 offset-s6">
              <h5 className="white-text">Links</h5>
              <ul>
                <li>
                  <a className="grey-text text-lighten-3" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Teachers
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Parents
                  </a>
                </li>
                <li>
                  <a className="grey-text text-lighten-3" href="#!">
                    Book Search
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            © 2019 Copyright
            <a className="grey-text text-lighten-4 right" href="#!">
              Pennez
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
