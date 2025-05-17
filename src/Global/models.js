'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const db = {};

// Sequelize 인스턴스 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// User 모델 등록
const User = require('../User/models/user')(sequelize, Sequelize.DataTypes);
db[User.name] = User;

// 여기에 다른 모델들 추가
// 예: const Post = require('../Post/models/post')(sequelize, Sequelize.DataTypes);
// db[Post.name] = Post;

// 모델 간 관계 설정
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Sequelize 인스턴스와 클래스 추가
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; 