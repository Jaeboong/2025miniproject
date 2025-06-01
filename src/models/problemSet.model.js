const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProblemSet = sequelize.define(
    "ProblemSet",
    {
      id: {
        type: DataTypes.INTEGER,
        field: "id",
        primaryKey: true,
        autoIncrement: true,
      },
      memberId: {
        type: DataTypes.INTEGER,
        field: "member_id",
        allowNull: false,
      },
      fileContent: {
        type: DataTypes.TEXT,
        field: "file_content",
        allowNull: false,
      },
      problemCount: {
        type: DataTypes.INTEGER,
        field: "problem_count",
        allowNull: false,
      },
      questionType: {
        type: DataTypes.STRING,
        field: "question_type",
        allowNull: false,
      },
      difficultyLevel: {
        type: DataTypes.STRING,
        field: "difficulty_level",
        allowNull: false,
      },
      problem: {
        // 기존 problems → ERD와 일치하도록 단수화
        type: DataTypes.JSON,
        field: "problem",
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "problem_sets",
      timestamps: false,
    }
  );

  return ProblemSet;
};
