const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Study = sequelize.define(
    "Study",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "member_id",
      },
      problemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "problem_id",
      },
      userAnswer: {
        type: DataTypes.STRING(5),
        allowNull: false,
        field: "user_answer",
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: "is_correct",
      },
      attemptCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "attempt_count",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
    },
    {
      tableName: "studies",
      timestamps: false,
    }
  );
  return Study;
}; 