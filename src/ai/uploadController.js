// src/ai/uploadController.js

const { problemSet, problem } = require("../global/models");
const { generateProblems } = require("./gptService");

const uploadFile = async (req, res) => {
  try {
    const { title, description, questionType, difficultyLevel, subject } = req.body;
    const fileContent = req.file.buffer.toString();

    // GPT를 통해 문제 생성
    const problems = await generateProblems(
      fileContent,
      req.body.problemCount,
      questionType,
      difficultyLevel
    );

    // 문제 세트 생성
    const newProblemSet = await problemSet.create({
      title,
      description,
      questionType,
      difficultyLevel,
      subject,
      memberId: req.user?.memberId || 1,
    });

    // 각 문제를 problems 테이블에 저장
    for (const problemData of problems) {
      await problem.create({
        problemSetId: newProblemSet.id,
        question: problemData.question,
        options: problemData.options,
        answer: problemData.answer,
        explanation: problemData.explanation || null,
        questionType,
        difficultyLevel
      });
    }

    // 생성된 문제 세트와 문제들을 함께 반환
    const createdProblemSet = await problemSet.findByPk(newProblemSet.id, {
      include: [{
        model: problem,
        attributes: ['problemId', 'question', 'options', 'answer', 'explanation']
      }]
    });

    res.json({ 
      success: true, 
      problemSet: createdProblemSet 
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  uploadFile,
};
