class CreateIngredientServices {
  constructor(repository) {
    this.repository = repository;
  }

  async index() {
    return await this.repository.select();
  }

  async create(newIngredients, DishID) {

    if (!newIngredients) {
      throw new AppError("Necessário informar os ingredientes");
    }

    newIngredients = newIngredients.map(Ingredient => Ingredient.toUpperCase().trim());

    const filteredIngredients = await this.#utils.filterIngredients(newIngredients);

    if (filteredIngredients.length > 0) {
      await this.repository.insert(filteredIngredients);
    }

    const newIngredientsIDs = await this.repository.show(newIngredients);
    const stringIngredientsIDs = newIngredientsIDs.map(ingredient => ingredient.id).toString();

    await this.repository.insertIDs(stringIngredientsIDs, DishID);
  }

  async delete(allDishes, id) {
    const [deletableDish] = allDishes.filter(dish => dish.id == id);
    const filteredDishes = allDishes.filter(dish => !(dish.id == id));

    const deletableDishIngredients = deletableDish.ingredients_id.split(",");

    const isAnUsedIngredient = deletableDishIngredients.filter(ingredient => (
      filteredDishes.find(dish => dish.ingredients_id.split(",").includes(ingredient))
    ))

    if (isAnUsedIngredient.length > 0) {
      const deletableIngredients = deletableDishIngredients.filter(ingredient_id => {
        return !(isAnUsedIngredient.includes(ingredient_id))
      })

      return await this.repository.delete(deletableIngredients);
    }

    return await this.repository.delete(deletableDishIngredients);
  }

  #utils = {
    filterIngredients: async (newIngredients) => {
      const allIngredients = await this.repository.select();

      const filteredIngredients = newIngredients
        .map(ingredient => ({ name: ingredient }))
        .filter(newIngredient => (
          !allIngredients.find(ingredient => ingredient.name === newIngredient.name)
        )
        )

      return filteredIngredients
    }
  };

}

module.exports = CreateIngredientServices;