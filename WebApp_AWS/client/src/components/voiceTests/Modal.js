import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.uploadLinktoAtlas = this.uploadLinktoAtlas.bind(this);
    this.checkstates = this.checkstates.bind(this);
  }
  checkstates() {
    console.log(this.props);
    console.log(this.state);
  }

  componentDidMount() {
    const options = {
      onOpenStart: () => {
        console.log("Open Start");
      },
      onOpenEnd: () => {
        console.log("Open End");
      },
      onCloseStart: () => {
        console.log("Close Start");
      },
      onCloseEnd: () => {
        console.log("Close End");
      },
      inDuration: 350,
      outDuration: 150,
      opacity: 0.6,
      dismissible: false,
      startingTop: "30%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  uploadLinktoAtlas() {
    const voiceInfo = {
      audioS3link: this.props.state.audioS3link,
      audioType: this.props.state.audioType,
      audioS3key: this.props.state.audioS3key,
      username: this.props.auth.auth.username,
      firstName: this.props.auth.auth.firstName,
      lastName: this.props.auth.auth.lastName,
      supervisorId: this.props.auth.auth._supervisor,
      studentId: this.props.auth.auth._id,

      lexileReadingLevel: this.props.auth.auth.lexileReadingLevel,
      readingGradeLevel: this.props.auth.auth.readingGradeLevel,
      schoolDistrictName: this.props.auth.auth.schoolDistrictName,
      state: this.props.auth.auth.state,
      zipCode: this.props.auth.auth.zipCode,
      currentGradeLevel: this.props.auth.auth.currentGradeLevel,
      firstName_lastName_teacher: this.props.auth.auth
        .firstName_lastName_teacher,

      sourceName: this.props.textSourceAll.sourceName,
      sourceReadingLevel: this.props.textSourceAll.readingGradeLevel,
      sourceLexile: this.props.textSourceAll.lexileSGRPL,
      sourceFiction: this.props.textSourceAll.fiction,
      sourceWordCounts: this.props.textSourceAll.wordCounts,

      sourceContent: this.props.textSourceAll.sourceContent,

      comment: "false",
      commentByAdmin: "false",
      commentByParent: "false",
      commentByTeacher: "false"
    };
    const res = axios.post("/api/students/voice", voiceInfo);
    axios
      .post("/api/aws/transcribe/new", this.props.state)
      .then(response => {
        console.log(response);
        this.setState({
          voiceInfo: {
            audioS3link: this.props.state.audioS3link,
            audioType: this.props.state.audioType,
            audioS3key: this.props.state.audioS3key,
            username: this.props.auth.auth.username,
            firstName: this.props.auth.auth.firstName,
            lastName: this.props.auth.auth.lastName,
            supervisorId: this.props.auth.auth._supervisor,
            studentId: this.props.auth.auth._id,

            lexileReadingLevel: this.props.auth.auth.lexileReadingLevel,
            readingGradeLevel: this.props.auth.auth.readingGradeLevel,
            schoolDistrictName: this.props.auth.auth.schoolDistrictName,
            state: this.props.auth.auth.state,
            zipCode: this.props.auth.auth.zipCode,
            currentGradeLevel: this.props.auth.auth.currentGradeLevel,
            firstName_lastName_teacher: this.props.auth.auth
              .firstName_lastName_teacher,

            sourceName: this.props.textSourceAll.sourceName,
            sourceReadingLevel: this.props.textSourceAll.readingGradeLevel,
            sourceLexile: this.props.textSourceAll.lexileSGRPL,
            sourceFiction: this.props.textSourceAll.fiction,
            sourceWordCounts: this.props.textSourceAll.wordCounts,

            sourceContent: this.props.textSourceAll.sourceContent
          }
        });
      })
      .catch(error => {
        console.log(error.response);
      });
    this.checkstates();
  }

  render() {
    return (
      <div>
        <a
          className="waves-effect waves-light btn modal-trigger right"
          data-target="modal1"
          disabled={!this.props.state.upload}
        >
          {!this.props.state.upload ? "Reading" : "Finished"}
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
          style={{ marginTop: 100 }}
        >
          <div className="modal-content">
            <i className="material-icons">insert_emoticon</i>
            <h2 style={{ fontSize: "40px", color: "teal" }}>Good Job!</h2>
          </div>
          <div className="modal-footer">
            <a
              href="test"
              className="modal-close waves-effect waves-red btn-flat left"
              style={{ fontSize: "30px", color: "grey" }}
            >
              Try Again
            </a>
            <a
              href="test"
              onClick={this.uploadLinktoAtlas}
              className="modal-close waves-effect waves-green btn-flat"
              style={{ fontSize: "30px", color: "teal" }}
            >
              Done
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
