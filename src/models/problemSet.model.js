// src/models/problemSet.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../global/db"); // ✅ db.js에서 직접 import

const ProblemSet = sequelize.define(
  "ProblemSet",
  {
    fileContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    problemCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyLevel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    problems: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "problem_sets",
    timestamps: false,
  }
);

module.exports = ProblemSet;
