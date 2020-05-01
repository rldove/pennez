import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AudioAnalyser from "react-audio-analyser";
import { uploadFile } from "react-s3";
import axios from "axios";
import Modal from "./Modal";

const config = {
	bucketName: "pennezaudio",
	dirName: "wavFiles" /* optional */,
	region: "us-east-1",
	accessKeyId: "AKIAJA3M26UTGRNQJZ6A",
	secretAccessKey: "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"
};

class AudioAnalysers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "",
			upload: false
		};
		this.checkstates = this.checkstates.bind(this);
	}

	componentDidMount() { }

	upload(e) {
		console.log(e.target.files[0]);
		uploadFile(e.target.files[0], config)
			.then(data => {
				console.log(data.location);
				this.setState({
					upload: true
				});
			})
			.catch(err => console.error(err));
	}

	checkstates() {
		console.log(this.props);
		console.log(this.state);
	}

	controlAudio(status) {
		this.setState({
			status
		});
	}

	changeScheme(e) {
		console.log(this.state);
		this.setState({
			audioType: e.name
		});
	}

	render() {
		const { status, audioSrc, audioS3key, audioType, blobDate } = this.state;
		const audioProps = {
			audioType: "audio/wav",
			status,
			audioSrc,
			timeslice: 1000,
			startCallback: e => {
				console.log("succ start", e);
			},
			stopCallback: e => {
				const windowUrl = window.URL.createObjectURL(e);
				const S3linkHead =
					"https://" +
					config.bucketName +
					".s3.amazonaws.com/" +
					config.dirName +
					"/";
				console.log(S3linkHead);
				this.setState({
					audioSrc: windowUrl,
					audioS3key: windowUrl.slice(38),
					audioS3link: S3linkHead.concat(windowUrl.slice(38)),
					blobDate: e,
					audioType: "audio/wav"
				});

				const dateUtc = new Date().toJSON().slice(0, 10);
				// const blobName = this.state.audioSrc.slice(27).concat(".wav");
				const blobName = this.state.audioS3key;
				const file = new File([this.state.blobDate], blobName, {
					type: this.state.audioType,
					lastModified: dateUtc
				});

				uploadFile(file, config)
					.then(data => {
						console.log(data.location);
						this.setState({
							upload: true
						});
					})
					.catch(err => console.error(err));

				console.log("succ stop", e);
			},
			onRecordCallback: e => {
				console.log("recording", e);
			},
			errorCallback: err => {
				console.log("error", err);
			},
			backgroundColor: "rgb(255,255,255)",
			strokeColor: "#4db6ac"
		};

		return (
			<div className="container" style={{ textAlign: "center" }}>
				<AudioAnalyser {...audioProps}>
					<div className="row">
						{status !== "recording" && (
							<a
								className="btn-floating btn-large waves-effect waves-light teal"
								title="Start"
								disabled={!this.props.sourceClick}
								onClick={() => this.controlAudio("recording")}
							>
								<i className="material-icons left">keyboard_voice</i>
							</a>
						)}
						{status === "recording" && (
							<a
								className="btn-floating btn-large waves-effect waves-light teal"
								title="Stop"
								onClick={() => this.controlAudio("inactive")}
							>
								<i className="material-icons left">stop</i>
							</a>
						)}
					</div>
				</AudioAnalyser>

				<div className="row">
					<Modal
						auth={this.props.auth}
						textSourceAll={this.props.textSourceAll}
						state={this.state}
					/>
				</div>
			</div>
		);
	}
}

function mapStateToProps(auth) {
	return { auth };
}

export default withRouter(connect(mapStateToProps)(AudioAnalysers));
