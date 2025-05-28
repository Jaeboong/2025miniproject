"use strict";

module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define("Problem", {
    problemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    problemSetId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    options: DataTypes.JSON, // ["A", "B", "C"] 형태로 저장
    answer: DataTypes.STRING,
  });
  return Problem;
};
