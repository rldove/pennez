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
      originalText: textSplit
    });
  }

  linesSource() {
    if (!this.state.originalText) {
      return (
        <div class="progress">
          <div class="indeterminate" />
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
          this.setState({
            AWSresult: {
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
      inDuration: 200,
      outDuration: 200,
      opacity: 0.4,
      dismissible: false,
      startingTop: "10%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
    setTimeout(() => {
      this.FetchTransResults();
      this.OriginalTextShow();
    }, 5000);
    setInterval(() => this.setState({ time: Date.now() }), 100);
  }

  handleTextClick(e) {
    this.setState({
      wordConfidence: e.alternatives[0].confidence
    });
  }

  renderAllWords() {
    if (!this.state.AWSresult) {
      return (
        <div className="progress">
          <div className="indeterminate" />
        </div>
      );
    }
    return this.state.AWSresult.NewTransText.map(word => {
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
              <textarea id="textarea2" className="materialize-textarea" />
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
          className="waves-effect waves-light btn modal-trigger"
          data-target={
            !this.props.Voive ? "..." : this.props.Voive.voiceInfo.sourceName
          }
        >
          Comment
        </a>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id={!this.props.Voive ? "..." : this.props.Voice.voiceInfo.sourceName}
          className="modal"
          style={{ marginTop: 25, width: 1200, height: 900 }}
        >
          <div className="modal-content">
            <h4>VOICE ASR</h4>

            <div className="row">
              <div className=" col s12 m6 l6">
                <div>
                  <h5>Pennez ASR & AWS Transcribe:</h5>
                  <h6 style={{ color: "teal" }}>Transcribe Text:</h6>
                  <p>{this.renderAllWords()}</p>
                  <h6 style={{ color: "teal" }}>
                    Pronunciation Average Confidence:
                    {!this.state.AWSresult
                      ? "..."
                      : this.state.AWSresult.confidence}
                  </h6>
                  <h6 style={{ color: "teal" }}>
                    Error Rate:
                    {!this.state.AWSresult
                      ? "..."
                      : this.state.AWSresult.error_rate}
                  </h6>
                </div>
                <audio
                  ref={ref => (this.player = ref)}
                  src={
                    !this.state.AWSresult
                      ? "..."
                      : this.props.Voice.voiceInfo.audioS3link
                  }
                  controls="controls"
                  preload="auto"
                  style={{ width: "540px", Color: "teal" }}
                />
              </div>

              <div className=" col s12 m6 l6">
                <h5>Source Info:</h5>
                <h6 style={{ color: "teal" }}>Source Text:</h6>
                <p style={{ fontSize: "18px" }}>{this.linesSource()}</p>
                <h6 style={{ color: "teal" }}>
                  Source Lexile level:
                  {!this.state.AWSresult
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceLexile}
                </h6>
                <h6 style={{ color: "teal" }}>
                  Source Reading Level:
                  {!this.state.AWSresult
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceReadingLevel}
                </h6>
                <h6 style={{ color: "teal" }}>
                  Source Word Counts:
                  {!this.state.AWSresult
                    ? "..."
                    : this.props.Voice.voiceInfo.sourceWordCounts}
                </h6>
              </div>
            </div>

            <div>
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
              <div className=" col s12 m12 l12" style={divStyle}>
                {this.CommentContent()}
              </div>
            </div>

            <div>
              <div className="row">
                <a
                  className="waves-effect waves-light btn red lighten-1 right"
                  onClick={() => this.VoiceDelete()}
                >
                  <i className="material-icons right">delete</i>
                  AWS Delete
                </a>
                <a
                  className="waves-effect waves-light btn blue lighten-1 right"
                  onClick={() => this.checkstates()}
                >
                  check states
                </a>
              </div>
            </div>

            <div className="modal-footer">
              <a
                className="modal-close waves-effect waves-red btn-flat"
                style={{ fontSize: "20px", color: "red" }}
              >
                Cancel
              </a>
              <a
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
