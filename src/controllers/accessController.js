const CreateUserServices = require("../services/userServices/CreateUserServices");
const UserRepository = require("../repositories/UserRepository");

class Access {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const userServices = new CreateUserServices(userRepository);

    const { user, token } = await userServices.access({email, password})
    
    return response.status(201).json({user, token});
  }
};

module.exports = Access;