// src/config/multer.js

const multer = require("multer");

// 메모리 저장소로 설정 (파일을 디스크에 저장하지 않음)
const storage = multer.memoryStorage();

// multer 인스턴스 생성
const upload = multer({ storage: storage });

module.exports = upload;
