const db = require("../global/models");


const getUserStudySummary = async (req, res) => {
  const { member_id } = req.params;

  try {
    const problems = await db.Study.findAll({
      where: { member_id },
      attributes: ["is_correct", "created_at"]
    });

    const total = problems.length;
    const correct = problems.filter(p => p.is_correct).length;

    const uniqueDates = new Set(
      problems.map(p => new Date(p.created_at).toISOString().slice(0, 10))
    );

    const study_days = uniqueDates.size;

    res.json({
      study_days,
      total,
      correct,
      accuracy: total === 0 ? 0 : Math.round((correct / total) * 1000) / 10
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
      is_correct: false,
      member_id,
    };
    if (subject) where.subject = subject;

    const wrongs = await db.Study.findAll({
      where,
      attributes: ["is_correct", "question", "answer", "subject"]
    });

    res.json({
      member_id,
      problem: wrongs
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