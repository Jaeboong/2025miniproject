// src/global/models.js
"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const db = {};

// Sequelize 인스턴스 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 모델 등록
const Member = require("../models/member.model")(
  sequelize,
  Sequelize.DataTypes
);
const ProblemSet = require("../models/problemSet.model")(
  sequelize,
  Sequelize.DataTypes
);
const Problem = require("../models/problems.model")(
  sequelize,
  Sequelize.DataTypes
); // ✅ 수정된 부분
const Study = require("../models/study.model")(sequelize, Sequelize.DataTypes);

db.member = Member;
db.problemSet = ProblemSet;
db.problem = Problem; // ✅ 등록
db.study = Study;

// 모델 관계 설정
db.member.hasMany(db.problemSet, { foreignKey: "member_id" });
db.problemSet.belongsTo(db.member, { foreignKey: "member_id" });

// 문제/문제세트 관계 추가
db.problemSet.hasMany(db.problem, { foreignKey: "problem_set_id" });
db.problem.belongsTo(db.problemSet, { foreignKey: "problem_set_id" });

// member ↔ study, problem ↔ study 관계 추가
db.member.hasMany(db.study, { foreignKey: "member_id" });
db.study.belongsTo(db.member, { foreignKey: "member_id" });
db.problem.hasMany(db.study, { foreignKey: "problem_id" });
db.study.belongsTo(db.problem, { foreignKey: "problem_id" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
