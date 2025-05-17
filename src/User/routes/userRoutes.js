const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');

// 모든 사용자 조회
router.get('/', userController.getAllUsers);

// 사용자 생성 (유효성 검사 미들웨어 추가)
router.post('/', validateUser, userController.createUser);

// ID로 사용자 조회
router.get('/:id', userController.getUserById);

module.exports = router; 