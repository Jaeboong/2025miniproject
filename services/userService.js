const db = require('../models');
const User = db.User;

// 사용자 서비스 클래스
class UserService {
  // 모든 사용자 조회
  async getAllUsers() {
    try {
      return await User.findAll({
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      throw error;
    }
  }
  
  // 사용자 생성
  async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      
      // 비밀번호를 제외한 사용자 정보 반환
      const userDataWithoutPassword = newUser.toJSON();
      delete userDataWithoutPassword.password;
      
      return userDataWithoutPassword;
    } catch (error) {
      throw error;
    }
  }
  
  // ID로 사용자 조회
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다.');
      }
      
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService(); 