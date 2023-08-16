const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage")

class CreateDishServices {
  constructor(repository) {
    this.repository = repository;
  }

  async index(allIngredients) {
    const allDishes = await this.repository.select();

    if (!allIngredients) {
      return allDishes
    }

    const allDishesWithIngredients = this.#utils.getAllDishesWithIngredients(allDishes, allIngredients);

    return allDishesWithIngredients
  }

  async show(id, allIngredients) {
    const dish = await this.repository.show(id);

    if (!allIngredients) {
      return dish
    }

    const dishWithIngredients = this.#utils.getDishWithIngredients(dish, allIngredients);

    return dishWithIngredients;
  }

  async create({ name, description, category, price, image }) {

    if (!image) {
      throw new AppError("Por favor, insira uma imagem para o prato.")
    }

    const diskStorage = new DiskStorage();
    await diskStorage.saveFile(image);

    return await this.repository.insert({ name, description, category, price, image });
  }

  async update({ id, name, description, category, price, image }) {
    const oldDishInfos = await this.repository.show(id);

    if (image) {
      const { filename } = image;

      const diskStorage = new DiskStorage();
      await diskStorage.saveFile(filename);
      await diskStorage.deleteFile(oldDishInfos.image)

      await this.repository.patch({ id, filename });
    }

    return await this.repository.update({ id, name, description, category, price });
  }

  async delete(id) {
    await this.repository.delete(id);

    return
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

      const { ingredients_id, ...restOfDishProperties } = dish;

      return {
        ...restOfDishProperties,
        ingredients: dishIngredients
      }
    }
  }
}

module.exports = CreateDishServices;