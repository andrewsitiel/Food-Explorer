const CreateIngredientServices = require("../services/ingredientServices/CreateIngredientServices");
const CreateDishServices = require("../services/dishServices/CreateDishServices");
const DishesRepository = require("../repositories/DishesRepository");
const IngredientsRepository = require("../repositories/IngredientsRepository");

const dishesRepository = new DishesRepository();
const dishesServices = new CreateDishServices(dishesRepository);
const ingredientsRepository = new IngredientsRepository();
const ingredientsServices = new CreateIngredientServices(ingredientsRepository);

class DishesController {

  async index(request, response) {
      const allIngredients = await ingredientsServices.index();
      const allDishes = await dishesServices.index(allIngredients);
      
      return response.status(200).json(allDishes);
  }

  async create(request, response) {
    const { name, description, category, price, ingredients } = request.body;
    const imageFileName = request.file.filename;

    const dishID = await dishesServices.create({name, description, category, price, image: imageFileName});
    await ingredientsServices.create(ingredients, dishID);
     
     return response.status(201).json("Prato criado com sucesso")
  }
}

module.exports = DishesController;