import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentVoices } from "../../actions";
import axios from "axios";
import VoiceComment from "./VoiceComment";

class StudentVoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
    this.CheckStates = this.CheckStates.bind(this);
  }

  CheckStates() {
    console.log(this.state);
    console.log(this.props);
  }

  getStatus() {
    setTimeout(() => {
      this.props.voices.map(voice => {
        axios
          .post("/api/aws/transcribe/results", voice)
          .then(response => {
            console.log(response);
            this.setState({
              [voice._id]: {
                audioS3key: voice.audioS3key,
                status: response.data.TranscriptionJob.TranscriptionJobStatus,
                resultUrl:
                  response.data.TranscriptionJob.Transcript.TranscriptFileUri,
                fetch: false,
                TransText: "",
                confidence: "",
                AWSupload: true,
                voiceInfo: voice
              }
            });
          })
          .catch(error => {
            console.log(error);
            this.setState({
              [voice._id]: {
                audioS3key: voice.audioS3key,
                status: "Not Found",
                resultUrl: "",
                fetch: false,
                TransText: "",
                confidence: "",
                AWSupload: false,
                voiceInfo: voice
              }
            });
          });
      });
    }, 1500);
  }

  componentDidMount() {
    this.props.fetchStudentVoices();
    this.getStatus();
  }

  renderAllVoices() {
    return this.props.voices.map(voice => {
      const New_Date = new Date(voice.dateCreate);
      const New = New_Date.toLocaleDateString();
      return (
        <tr>
          <td>{voice.sourceName}</td>
          <td>
            <a href={voice.audioS3link}>AWS S3 Link</a>
          </td>
          <td>{New} </td>
          <td>
            {!this.state[voice._id] ? (
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
              <a
                className="waves-effect waves-light btn-flat white lighten-2 left"
                style={{ fontSize: "15px", color: "teal" }}
              >
                {this.state[voice._id].status}
              </a>
            )}
          </td>
          <td>
            {!this.state[voice._id] ? (
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
              <VoiceComment Voice={this.state[voice._id]} />
            )}
          </td>
          <td>
            {!this.state[voice._id] ? (
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
              <a
                className="waves-effect waves-light btn-flat white lighten-2 left"
                style={{ fontSize: "15px", color: "teal" }}
              >
                {this.state[voice._id].audioS3key}
              </a>
            )}
          </td>
        </tr>
      );
    });
  }

  renderVoices() {
    return (
      <div className="container">
        <div className="row">
          <h4>All Voice Clips</h4>
          <a
            href="/accounts/voices"
            className="waves-effect waves-light btn-small teal lighten-2 right"
            onClick={() => this.CheckStates()}
          >
            <i className="material-icons left">autorenew</i>
            Refresh
          </a>
        </div>
        <table className="highlight">
          <thead>
            <tr>
              <th>Voice Name</th>
              <th>Voice Link</th>
              <th>Date</th>
              <th>Voice STATUS</th>
              <th>Comment</th>
              <th>other</th>
            </tr>
          </thead>
          <tbody>{this.renderAllVoices()}</tbody>
        </table>

        <a
          className="waves-effect waves-light btn blue lighten-3 right"
          disabled={this.state.tanscribeStatus}
          onClick={() => this.CheckStates()}
          style={{ marginTop: "100px" }}
        >
          <i className="material-icons right">grade</i>
          State
        </a>
      </div>
    );
  }

  render() {
    return <div style={{ marginBottom: 1000 }}>{this.renderVoices()}</div>;
  }
}

function mapStateToProps({ voices }) {
  return { voices };
}

export default connect(
  mapStateToProps,
  { fetchStudentVoices }
)(StudentVoices);
