// 엄격 모드를 활성화하여 JavaScript의 더 엄격한 구문 체크와 최적화를 적용합니다.
'use strict';

// 파일 시스템 관련 작업을 위한 Node.js 내장 모듈을 가져옵니다.
const fs = require('fs');
// 파일 및 디렉토리 경로 관리를 위한 Node.js 내장 모듈을 가져옵니다.
const path = require('path');
// Sequelize ORM 라이브러리를 가져옵니다.
const Sequelize = require('sequelize');
// 환경 변수 접근을 위한 Node.js 내장 모듈을 가져옵니다.
const process = require('process');
// 현재 파일의 기본 이름(확장자 제외)을 가져옵니다.
const basename = path.basename(__filename);
// 현재 실행 환경(development, test, production 등)을 확인합니다. 환경 변수가 설정되지 않은 경우 'development'를 기본값으로 사용합니다.
const env = process.env.NODE_ENV || 'development';
// 환경에 맞는 데이터베이스 설정을 config.json 파일에서 불러옵니다.
const config = require(__dirname + '/../config/config.json')[env];
// 모든 모델을 저장할 빈 객체를 생성합니다.
const db = {};

// Sequelize 인스턴스를 저장할 변수를 선언합니다.
let sequelize;
// 환경 변수를 통해 데이터베이스 연결 정보가 제공되는 경우를 처리합니다.
if (config.use_env_variable) {
  // 환경 변수의 값을 사용하여 Sequelize 인스턴스를 생성합니다.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // config.json에 명시적으로 정의된 데이터베이스 정보를 사용하여 Sequelize 인스턴스를 생성합니다.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// models 디렉토리의 모든 파일 목록을 읽어옵니다.
fs
  .readdirSync(__dirname)
  // 모델 파일로 간주할 수 있는 파일만 필터링합니다.
  .filter(file => {
    return (
      // 점(.)으로 시작하지 않는 파일만 포함합니다(숨김 파일 제외).
      file.indexOf('.') !== 0 &&
      // 현재 파일(index.js)은 제외합니다.
      file !== basename &&
      // .js 확장자를 가진 파일만 포함합니다.
      file.slice(-3) === '.js' &&
      // 테스트 파일(.test.js)은 제외합니다.
      file.indexOf('.test.js') === -1
    );
  })
  // 필터링된 각 파일에 대해 모델을 로드하고 초기화합니다.
  .forEach(file => {
    // 모델 파일을 불러와 실행합니다. sequelize 인스턴스와 DataTypes를 인자로 전달합니다.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // 초기화된 모델을 그 이름을 키로 하여 db 객체에 추가합니다.
    db[model.name] = model;
  });

// 모든 모델 간의 관계(associations)를 설정합니다.
Object.keys(db).forEach(modelName => {
  // 모델에 associate 메서드가 있는 경우, db 객체를 인자로 전달하여 호출합니다.
  // 이를 통해 모델 간의 관계(hasMany, belongsTo 등)를 설정할 수 있습니다.
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db 객체에 Sequelize 인스턴스를 추가합니다.
db.sequelize = sequelize;
// db 객체에 Sequelize 클래스를 추가합니다.
db.Sequelize = Sequelize;

// 구성된 db 객체를 내보냅니다. 이를 통해 다른 파일에서 모델에 접근할 수 있습니다.
module.exports = db;