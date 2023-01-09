const CreateDishesServices = require("../services/dishesServices/CreateDishesServices");
const DishesRepository = require("../repositories/DishesRepository");

class DishesController {
  async index(request, response) {
    const dishesRepository = new DishesRepository();
    const dishesServices = new CreateDishesServices(dishesRepository);
    
    const allDishes = await dishesServices.index();

    return response.status(200).json({allDishes});
  }
}

module.exports= DishesController;