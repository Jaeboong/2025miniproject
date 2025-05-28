"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const { Study } = require("../study/studyModel");
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
const Member = require("../models/member.model")(sequelize);
const ProblemSet = require("../models/problemSet.model")(sequelize);
const studyModel = Study(sequelize);

// DB 객체에 등록
db.member = Member;
db.problemSet = ProblemSet;
db[studyModel.name] = studyModel;

// 관계 설정
// 한 명의 회원은 여러 문제세트를 가질 수 있음
db.member.hasMany(db.problemSet, {
  foreignKey: "memberId",
});

// 문제세트는 하나의 회원에 속함
db.problemSet.belongsTo(db.member, {
  foreignKey: "memberId",
});

// associate 함수가 있다면 실행
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sequelize 인스턴스와 Sequelize 라이브러리 자체도 함께 export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
