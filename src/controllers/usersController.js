const CreateUserServices = require("../services/userServices/CreateUserServices");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository();
const userServices = new CreateUserServices(userRepository);

class UserController {

  async create(request, response) {
    const { name, email, password } = request.body;


    const message = await userServices.create({ name, email, password });

    return response.status(201).json({ message });
  }
}

module.exports = UserController;

