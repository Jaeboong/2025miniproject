const mongoose = require('mongoose');

const problemSetSchema = new mongoose.Schema({
  fileContent: String,
  problemCount: Number,
  questionType: String,
  difficultyLevel: String,
  problems: [{
    question: String,
    answer: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProblemSet', problemSetSchema); 