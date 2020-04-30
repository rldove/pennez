const mongoose = require("mongoose");
const { Schema } = mongoose;

const readingSourceSchema = new Schema({
  lexileSGRPL: { type: String, default: "unknown" },
  readingGradeLevel: { type: String, default: "unknown" },
  fiction: { type: String, default: "unknown" },
  sourceName: { type: String, default: "unknown" },
  sourceContent: { type: String, default: "unknown" },
  wordCounts: { type: Number, default: 0 }
});

mongoose.model("readingsources", readingSourceSchema);
