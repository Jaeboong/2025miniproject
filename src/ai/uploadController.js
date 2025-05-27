const ProblemSet = require("../models/problemSet.model");
const { generateProblems } = require("./gptService");

const uploadFile = async (req, res) => {
  try {
    const { problemCount, questionType, difficultyLevel } = req.body;
    const fileContent = req.file.buffer.toString();

    // GPT를 통해 문제 생성
    const problems = await generateProblems(
      fileContent,
      problemCount,
      questionType,
      difficultyLevel
    );

    // DB에 저장
    const problemSet = new ProblemSet({
      fileContent,
      problemCount,
      questionType,
      difficultyLevel,
      problems,
    });

    await problemSet.save();

    res.json({ success: true, problemSet });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  uploadFile,
};
