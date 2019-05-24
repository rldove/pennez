const mongoose = require("mongoose");

const ReadingSources = mongoose.model("readingsources");

module.exports = app => {
  app.post("/api/readingsources/upload", async (req, res) => {
    const {
      lexileSGRPL,
      readingGradeLevel,
      fiction,
      sourceName,
      sourceContent,
      wordCounts
    } = req.body;

    const parent = new ReadingSources({
      lexileSGRPL,
      readingGradeLevel,
      fiction,
      sourceName,
      sourceContent,
      wordCounts
    }).save();
    res.send(req.user);
  });
};
