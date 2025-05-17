const userService = require('../services/userService');

// 사용자 컨트롤러
class UserController {
  // 모든 사용자 조회
  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ 
        message: '사용자 조회 실패', 
        error: error.message 
      });
    }
  }
  
  // 사용자 생성
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const userData = { username, email, password };
      
      const newUser = await userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ 
        message: '사용자 생성 실패', 
        error: error.message 
      });
    }
  }
  
  // ID로 사용자 조회
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      res.json(user);
    } catch (error) {
      res.status(404).json({ 
        message: error.message 
      });
    }
  }
}

module.exports = new UserController(); 