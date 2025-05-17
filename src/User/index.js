const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const userService = require('./services/userService');
const validateUser = require('./middlewares/validateUser');

module.exports = {
  routes: userRoutes,
  controller: userController,
  service: userService,
  middleware: {
    validateUser
  }
}; 