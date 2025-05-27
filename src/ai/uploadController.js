// src/ai/uploadController.js

const { problemSet } = require("../global/models"); // ✅ 수정된 부분
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
    const newProblemSet = await problemSet.create({
      fileContent,
      problemCount,
      questionType,
      difficultyLevel,
      problem: problems,
      memberId: req.user?.memberId || 1, // 🔒 인증 사용자 ID 설정 (임시로 1번 회원 사용 가능)
    });

    res.json({ success: true, problemSet: newProblemSet });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  uploadFile,
};
