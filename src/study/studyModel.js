const { DataTypes } = require("sequelize");

const Study = (sequelize) =>
  sequelize.define("Study", {
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
    },
    answer: {
      type: DataTypes.TEXT,
    },
    subject: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "problem",
    timestamps: false,
  });

module.exports = { Study };