const CreateUserServices = require("../services/userServices/CreateUserServices");
const UserRepository = require("../repositories/UserRepository");

const userRepository = new UserRepository();
const userServices = new CreateUserServices(userRepository);

class UserController {

  async index(request, response) {
    const user_id = request.user.id;

    const userFavorites = await userServices.index(user_id);

    return response.status(200).json({userFavorites})
  }
  
  async create (request, response) {
    const { name, email, password } = request.body;

    
    const message = await userServices.create({name, email, password});
    
    return response.status(201).json({ message });
  }

  async update(request, response) {
    const { favorites } = request.body;
    const user_id = request.user.id;

    await userServices.update(favorites, user_id);
      
    return response.status(201).json({})       
  }
}

module.exports = UserController;

