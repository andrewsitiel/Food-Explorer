const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage")

class CreateDishServices{
  constructor(repository){
    this.repository = repository;
  }

  async index(allIngredients) {
    const allDishes = await this.repository.select();
    
    const allDishesWithIngredients = this.#utils.getAllDishesWithIngredients(allDishes, allIngredients);

    return allDishesWithIngredients
  }

  async show(id, allIngredients) {
    const dish = await this.repository.show(id);
    const dishWithIngredients = this.#utils.getDishWithIngredients(dish, allIngredients);

    return dishWithIngredients;
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
    getAllDishesWithIngredients: async (allDishes, allIngredients) => {

      const allDishesWithIngredients = allDishes.map(dish => {
        const dishIngredientsIDs = dish.ingredients_id.split(",");
        
        const dishIngredients = allIngredients.filter(ingredient => (
          dishIngredientsIDs.find(id => id == ingredient.id)
        ));
        
        const dishIngredientsNames = dishIngredients.map(ingredient => ingredient.name);
  
        return {
          id: dish.id,
          name: dish.name,
          description: dish.description,
          category: dish.category,
          image: dish.image,
          price: dish.price,
          ingredients: dishIngredientsNames
        }
      });

      return allDishesWithIngredients
    },
    getDishWithIngredients: async (dish, allIngredients) => {
      const dishIngredientsIDs = dish.ingredients_id.split(",");
      
      const dishIngredients = allIngredients.filter(ingredient => (
        dishIngredientsIDs.find(id => id == ingredient.id)
      ));

      const {ingredients_id, ...restOfDishProperties} = dish; 

      return {
        ...restOfDishProperties,
        ingredients: dishIngredients
      } 
    }   
  }
}

module.exports = CreateDishServices;