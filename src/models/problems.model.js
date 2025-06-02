// src/models/problems.model.js
"use strict";

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      explanation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "problems",
      timestamps: false,
    }
  );

  return Problem;
};
