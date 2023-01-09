const CreateUserServices = require("../services/userServices/CreateUserServices");
const UserRepository = require("../repositories/UserRepository");

class UserController {
  
  async create (request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userServices = new CreateUserServices(userRepository);
    
    await userServices.create({name, email, password});
    
    return response.status(201).json();
  }
}

module.exports = UserController;