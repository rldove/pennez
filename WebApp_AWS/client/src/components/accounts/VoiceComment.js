import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import axios from "axios";

class VoiceComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      color: "red",
      backColor: "yellow",
      comment: "block",
      wordConfidence: "0"
    };
    this.checkstates = this.checkstates.bind(this);
    this.FetchTransResults = this.FetchTransResults.bind(this);
    this.VoiceDelete = this.VoiceDelete.bind(this);
    this.startComment = this.startComment.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  handleCommentChange(event) {
    this.setState({ commentContent: event.target.value });
  }

  stopVoicePlay() {
    this.player.pause();
  }
  submitComment() {
    this.player.pause();
    axios
      .post("/api/students/voice/comment", this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  startComment() {
    if (this.state.comment == "block") {
      this.setState({
        comment: "none"
      });
    } else {
      this.setState({
        comment: "block"
      });
    }
  }

  checkstates() {
    console.log(this.props);
    console.log(this.state);
    console.log(this.player.currentTime);
  }

  OriginalTextShow() {
    if (!this.props.Voice.voiceInfo) {
      this.setState({
        originalText: "textSplit"
      });
    }
    const textSplit = this.props.Voice.voiceInfo.sourceContent.split("/t/");
    this.setState({
      originalText: textSplit,
      voice_key: this.props.Voice.voiceInfo.audioS3key
    });
  }

  linesSource() {
    if (!this.state.originalText) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
    return this.state.originalText.map(testContent => {
      return <p style={{ fontSize: "18px" }}>{testContent}</p>;
    });
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

  FetchTransResults() {
    if (!this.props.Voice.resultUrl) {
      return (
        <div>
          <div class="progress">
            <div class="indeterminate" />
          </div>
          <p>Something went wrong, please refresh</p>
        </div>
      );
    }
    const awsUrl = this.props.Voice.resultUrl;
    fetch(awsUrl).then(response => {
      response
        .json()
        .then(data => ({
          data: data,
          status: response.status
        }))
        .then(res => {
          console.log(res.data.results);
          const newArr = [];
          const newJson = res.data.results.items;
          for (const item in newJson) {
            if (newJson[item].alternatives[0].confidence !== null) {
              newArr.push(parseFloat(newJson[item].alternatives[0].confidence));
            }
          }
          // if (newArr === undefined || newArr.length == 0) {
          //   const avg = "0%";
          // }
          const sum = newArr.reduce(
            (previous, current) => (current += previous)
          );
          // const sum = 777;
          const avg = ((sum / newArr.length) * 100).toFixed(2) + "%";
          const syncData = res.data.results.items;

          const textNewCompare = this.props.Voice.voiceInfo.sourceContent.replace(
            "/t/",
            ""
          );
          const AWSTransText = res.data.results.transcripts[0].transcript;
          const TestNew = textNewCompare.split("A cooler");

          const re1 = AWSTransText.replace(".", "");
          const re2 = re1.split(" ");
          const or1 = TestNew[0].replace(".", "");
          const or2 = or1.split(" ");
          const all_length = or2.length;
          let num_overlap = 0;
          re2.forEach(e1 => {
            if (or2.includes(e1)) {
              num_overlap = num_overlap + 1;
            }
          });
          const error_rate =
            ((1 - num_overlap / all_length) * 100).toFixed(2) + "%";
          console.log(this.props.Voice.audioS3key);
          this.setState({
            [this.props.Voice.audioS3key]: {
              fetch: true,
              TransResults: res.data.results,
              TransText: AWSTransText,
              NewTransText: syncData,
              confidence: avg,
              error_rate: error_rate
            }
          });
        });
    });
  }

  OnUploadProps() {
    this.checkstates();
    this.FetchTransResults();
    this.OriginalTextShow();
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
    setInterval(() => this.setState({ time: Date.now() }), 100);
  }

  handleTextClick(e) {
    this.setState({
      wordConfidence: e.alternatives[0].confidence
    });
  }

  renderAllWords() {
    if (!this.state[this.props.Voice.audioS3key]) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
    return this.state[this.props.Voice.audioS3key].NewTransText.map(word => {
      const time = this.player.currentTime;
      const startTime = parseFloat(word.start_time);
      const endTime = parseFloat(word.end_time);
      if (time >= startTime && time <= endTime && startTime !== null) {
        return (
          <p
            className="inline"
            style={{
              backgroundColor: this.state.backColor,
              color: "teal",
              display: "inline",
              fontSize: "18px"
            }}
          >
            {word.alternatives[0].content}{" "}
          </p>
        );
      }
      return (
        <p
          className="inline"
          style={{
            display: "inline",
            fontSize: "18px"
          }}
        >
          {word.alternatives[0].content}{" "}
        </p>
      );
    });
  }

  CommentContent() {
    return (
      <div className="row">
        <form className="col s10">
          <div className="row">
            <div className="input-field col s10">
              <i className="material-icons prefix">mode_edit</i>
              <textarea
                id="textarea2"
                className="materialize-textarea"
                onChange={this.handleCommentChange}
              />
              <label htmlFor="textarea2">Textarea</label>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const divStyle = {
      display: this.state.comment == "none" ? "block" : "none"
    };
    return (
      <div>
        <a
          className="waves-effect waves-light btn-floating modal-trigger"
          data-target={this.props.idValue}
          key={this.props.s3key}
          id={this.props.s3key}
          onClick={() => this.OnUploadProps()}
        >
          <i class="material-icons">add</i>
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={this.props.idValue}
          className="modal"
          style={{ marginTop: 25, width: 1200, height: 900 }}
        >
          <div className="modal-content">
            <div className="row">
              <div className=" col s12 m6 l6">
                <div>
                  <h5>Student Voice Text</h5>
                  <h6 style={{ color: "teal" }}>Transcribe Text:</h6>
                  <p>{this.renderAllWords()}</p>
                </div>
                <audio
                  ref={ref => (this.player = ref)}
                  src={
                    !this.state[this.props.Voice.audioS3key]
                      ? "..."
                      : this.props.Voice.voiceInfo.audioS3link
                  }
                  controls="controls"
                  preload="auto"
                  style={{ width: "540px", Color: "teal" }}
                />
              </div>

              <div className=" col s12 m6 l6">
                <h5>Original Text</h5>
                <h6 style={{ color: "teal" }}>Source Text:</h6>
                <p style={{ fontSize: "18px" }}>{this.linesSource()}</p>
                <h6 style={{ color: "teal" }}>
                  Source Lexile level:
                  {!this.state[this.props.Voice.audioS3key]
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceLexile}
                </h6>
                <h6 style={{ color: "teal" }}>
                  Source Reading Level:
                  {!this.state[this.props.Voice.audioS3key]
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceReadingLevel}
                </h6>
                <h6 style={{ color: "teal" }}>
                  Source Word Counts:
                  {!this.state[this.props.Voice.audioS3key]
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceWordCounts}
                </h6>
              </div>
            </div>

            <div>
              <div className="row">
                <p style={{ color: "teal", fontSize: 20 }}>
                  Comment:
                  {this.props.Voice.voiceInfo.comment == "false"
                    ? " No Comment"
                    : this.props.Voice.voiceInfo.commentByAdmin}
                </p>
              </div>
              <a
                className="waves-effect waves-light btn-flat"
                onClick={() => this.startComment()}
                style={{ fontSize: "24px", color: "black" }}
              >
                <i className="material-icons right">
                  {this.state.comment == "none"
                    ? "arrow_upward"
                    : "arrow_downward"}
                </i>
                Write Comment
              </a>
              <div className="col s12 m12 l12" style={divStyle}>
                {this.CommentContent()}
              </div>
            </div>

            <div className="modal-footer">
              <a
                className="modal-close waves-effect waves-red btn-flat"
                style={{ fontSize: "20px", color: "red" }}
                onClick={() => this.stopVoicePlay()}
              >
                Cancel
              </a>
              <a
                onClick={() => this.submitComment()}
                herf="allvoices"
                className="modal-close waves-effect waves-green btn-flat"
                style={{ fontSize: "20px", color: "teal" }}
              >
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VoiceComment;
