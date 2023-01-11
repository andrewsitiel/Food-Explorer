const CreateDishesServices = require("../services/dishesServices/CreateDishesServices");
const DishesRepository = require("../repositories/DishesRepository");

const dishesRepository = new DishesRepository();
const dishesServices = new CreateDishesServices(dishesRepository);

class DishesController {

  async index(request, response) {
    
    const allDishes = await dishesServices.index();

    return response.status(200).json({allDishes});
  }

  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body;

    await dishesServices.create({name, description, category, price});

    return response.status(201).json("Prato criado com sucesso")
  }
}

module.exports= DishesController;