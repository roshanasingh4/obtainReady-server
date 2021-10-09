const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  file: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("files", fileUploadSchema);
