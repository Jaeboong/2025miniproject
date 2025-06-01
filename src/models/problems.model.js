// src/models/problems.model.js
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define(
    "Problem",
    {
      problemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "problem_id",
      },
      problemSetId: {
        type: DataTypes.INTEGER,
        field: "problem_set_id",
      },
      memberId: {
        type: DataTypes.INTEGER,
        field: "member_id",
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
      question: {
        type: DataTypes.STRING,
      },
      options: {
        type: DataTypes.JSON,
      },
      answer: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "problems",
      timestamps: false,
    }
  );

  return Problem;
};
