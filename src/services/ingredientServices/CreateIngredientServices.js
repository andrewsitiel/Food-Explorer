class CreateIngredientServices {
  constructor(repository){
    this.repository = repository;
  }

  async index() {
    return await this.repository.select()
  }

  async create(newIngredients, DishID) {
    const allIngredients = await this.repository.select();

    newIngredients = newIngredients.map(newIngredient => newIngredient.toUpperCase())

    const filteredIngredients = newIngredients
    .map(ingredient => ( {name: ingredient} ))
    .filter(newIngredient => (
      !allIngredients.find( ingredient => ingredient.name === newIngredient.name ))
    )

    if(filteredIngredients.length > 0){
      await this.repository.insert(filteredIngredients);
    }

    const newIngredientsIDs = await this.repository.show(newIngredients);
    const stringIngredientsIDs = newIngredientsIDs.map(ingredient => ingredient.id).toString();

    await this.repository.insertIDs(stringIngredientsIDs, DishID);
  }
}

module.exports = CreateIngredientServices;