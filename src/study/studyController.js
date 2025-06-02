const db = require("../global/models");

const getUserStudySummary = async (req, res) => {
  const { member_id } = req.params;

  try {
    const studies = await db.study.findAll({
      where: { memberId: member_id },
      include: [{
        model: db.problem,
        include: [{
          model: db.problemSet,
          attributes: ['subject']
        }]
      }],
      attributes: ["isCorrect", "createdAt", "attemptCount"]
    });

    const total = studies.length;
    const correct = studies.filter(s => s.isCorrect).length;
    const uniqueDates = new Set(
      studies.map(s => new Date(s.createdAt).toISOString().slice(0, 10))
    );

    // 과목별 통계 계산
    const subjectStats = {};
    studies.forEach(study => {
      const subject = study.Problem.ProblemSet.subject;
      if (!subjectStats[subject]) {
        subjectStats[subject] = { total: 0, correct: 0 };
      }
      subjectStats[subject].total++;
      if (study.isCorrect) {
        subjectStats[subject].correct++;
      }
    });

    res.json({
      studyDays: uniqueDates.size,
      total,
      correct,
      accuracy: total === 0 ? 0 : Math.round((correct / total) * 1000) / 10,
      subjectStats
    });
  } catch (err) {
    console.error("학습 요약 실패", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

const getWrongNotes = async (req, res) => {
  const { member_id } = req.params;
  const { subject } = req.query;

  try {
    const where = {
      isCorrect: false,
      memberId: member_id,
    };

    const studies = await db.study.findAll({
      where,
      include: [{
        model: db.problem,
        include: [{
          model: db.problemSet,
          where: subject ? { subject } : {},
          attributes: ['subject']
        }]
      }],
      attributes: ["userAnswer", "attemptCount", "createdAt"],
      order: [['createdAt', 'DESC']]
    });

    const problems = studies.map(study => ({
      problemId: study.Problem.problemId,
      question: study.Problem.question,
      options: study.Problem.options,
      userAnswer: study.userAnswer,
      correctAnswer: study.Problem.answer,
      explanation: study.Problem.explanation,
      attemptCount: study.attemptCount,
      subject: study.Problem.ProblemSet.subject,
      createdAt: study.createdAt
    }));

    res.json({
      member_id,
      problems
    });
  } catch (err) {
    console.error("오답노트 실패", err);
    res.status(500).json({ message: "서버 에러" });
  }
};

module.exports = {
  getUserStudySummary,
  getWrongNotes
};