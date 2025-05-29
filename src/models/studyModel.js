const { DataTypes } = require("sequelize");


const Study = (sequelize) =>
  sequelize.define("Study", {
    problem_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    problem_set_id: {
      type: DataTypes.INTEGER
    },
    member_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modified_at: {
      type: DataTypes.DATE
    },
    question: {
      type: DataTypes.TEXT
    },
    answer: {
      type: DataTypes.TEXT
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    options: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: "problem", 
    timestamps: false     
  }
);


module.exports = { Study };