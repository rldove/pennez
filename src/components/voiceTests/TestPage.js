import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentSource, fetchUser } from "../../actions";
import AudioAnalysers from "./AudioAnalysers";

class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      view: false,
      sourceClick: false
    };
    this.recordSource = this.recordSource.bind(this);
    this.readingSourceChanged = this.readingSourceChanged.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkstates = this.checkstates.bind(this);
  }

  recordSource() {
    console.log(this.state);
    console.log(this.props);
  }

  checkstates() {
    console.log(this.props, this.state);
  }

  readingSourceChanged(e) {
    console.log(e);
    this.source = e;
    const sourceSplit = e.sourceContent.split("/t/");
    this.setState({
      source: e,
      testContent: sourceSplit,
      sourceClick: true
    });
  }
  handleClose() {
    this.setState({ view: false });
  }

  handleShow() {
    this.setState({ view: true });
  }

  componentDidMount() {
    this.props.fetchStudentSource();
    this.props.fetchUser();
  }

  linesSource() {
    return this.state.testContent.map(testContent => {
      return <p style={{ fontSize: "18px", color: "teal" }}>{testContent}</p>;
    });
  }

  renderSurveys() {
    const showSource = "";
    if (this.state.testContent) {
      return (
        <div>
          <div style={{ textAlign: "center", fontSize: "25px", color: "teal" }}>
            {this.state.source.sourceName}
          </div>
          <div className="row" style={{ textAlign: "left", height: "20px" }}>
            <div className="col s8 offset-s2">
              <div className="card white">
                <div className="card-content white-text">
                  {this.linesSource()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h4 style={{ marginTop: 30 }}>Let's Get Ready to Read!</h4>
        </div>
      );
    }
  }

  sideBar() {
    return this.props.studentSource.map(studentSource => {
      return (
        <a
          className="collection-item"
          onClick={() => this.readingSourceChanged(studentSource)}
        >
          {studentSource.sourceName}
        </a>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <p style={{ color: "teal", fontSize: 24 }}>
            Hello {!this.props.auth ? "" : this.props.auth.firstName}
          </p>
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <h4 style={{ color: "teal" }}>Reading Test</h4>
        </div>

        <div>
          <div className="row" style={{ marginTop: 10 }}>
            <div className="col s2">
              <div className="collection">
                <h6>Story Title</h6>
                <div>{this.sideBar()}</div>
              </div>
            </div>

            <div className="container" style={{ textAlign: "center" }}>
              {this.renderSurveys()}
            </div>
            <AudioAnalysers
              textSourceAll={this.state.source}
              testContent={this.state.testContent}
              sourceClick={this.state.sourceClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ studentSource, auth }) {
  return { studentSource, auth };
}

export default connect(
  mapStateToProps,
  { fetchStudentSource, fetchUser }
)(TestPage);
