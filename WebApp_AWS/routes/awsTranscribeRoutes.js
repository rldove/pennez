const AWS = require("aws-sdk");
const mongoose = require("mongoose");
const keys = require("../config/keys");

AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.Credentials(keys.awsKeyId, keys.awsSecretId)
});

// AWS.config.loadFromPath("../../utils/awsConfig.json");

const transcriber = new AWS.TranscribeService();

module.exports = app => {
  app.post("/api/aws/transcribe/new", async (req, res) => {
    // console.log(req.body.audioS3key);
    const params = {
      LanguageCode: "en-US",
      Media: {
        MediaFileUri: req.body.audioS3link
      },
      MediaFormat: "wav",
      OutputBucketName: "pennezaudio",
      TranscriptionJobName: req.body.audioS3key
    };

    transcriber.startTranscriptionJob(params, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

  app.post("/api/aws/transcribe/status", async (req, res) => {
    // console.log(req.body.audioS3key);
    const params = {
      JobNameContains: req.body.audioS3key,
      MaxResults: 1
    };

    await transcriber.listTranscriptionJobs(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
      res.send(data.TranscriptionJobSummaries[0]);
    });
  });

  app.post("/api/aws/transcribe/results", async (req, res) => {
    // console.log(req.body.audioS3key);
    const params = {
      TranscriptionJobName: req.body.audioS3key
    };
    await transcriber.getTranscriptionJob(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data);
      res.send(data); // successful response
    });
  });

  app.post("/api/aws/transcribe/delete", async (req, res) => {
    // console.log(req.body.audioS3key);
    const params = {
      TranscriptionJobName: req.body.audioS3key
    };
    await transcriber.deleteTranscriptionJob(params, function(err, data) {
      if (err) console.log(err, err.stack);
      // an error occurred
      else console.log(data);
      res.send(data); // successful response
    });
  });
};
