const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage")

class CreateDishServices{
  constructor(repository){
    this.repository = repository;
  }
  
  async index(allIngredients) {
    
    const allDishesWithIngredients = this.#utils.getAllDishesWithIngredients(allIngredients);

    return allDishesWithIngredients
  }

  async create(newDish) {
    newDish.name = newDish.name.toUpperCase();

    if(!newDish.image) {
      throw new AppError("Por favor, insira uma imagem para o prato.")
    }

    const diskStorage = new DiskStorage();
    
    await diskStorage.saveFile(newDish.image);
    return await this.repository.insert(newDish);
  }

  #utils = {
    getAllDishesWithIngredients: async (allIngredients) => {
      const allDishes = await this.repository.select();

      const allDishesWithIngredients = allDishes.map(dish => {
        const dishIngredientsIDs = dish.ingredients_id.split(",");
        
        const dishIngredients = allIngredients.filter(ingredient => (
          dishIngredientsIDs.find(id => id == ingredient.id)
        ));
        
        const dishIngredientsNames = dishIngredients.map(ingredient => ingredient.name);
  
        return {
          name: dish.name,
          description: dish.description,
          category: dish.category,
          image: dish.image,
          price: dish.price,
          ingredients: dishIngredientsNames
        }
      });

      return allDishesWithIngredients
    }
  }
}

module.exports = CreateDishServices;