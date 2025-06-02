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
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "Untitled Problem Set",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: "General",
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
