class CreateIngredientServices {
  constructor(repository){
    this.repository = repository;
  }

  async index() {
    return await this.repository.select()
  }

  async create(newIngredients, DishID) {

    if(!newIngredients) {
      throw new AppError("Necessário informar os ingredientes")
    }

    newIngredients = newIngredients.toUpperCase().trim().split(",");
    
    const filteredIngredients = await this.#utils.filterIngredients(newIngredients);

    if(filteredIngredients.length > 0){
      await this.repository.insert(filteredIngredients);
    }

    const newIngredientsIDs = await this.repository.show(newIngredients);
    const stringIngredientsIDs = newIngredientsIDs.map(ingredient => ingredient.id).toString();

    await this.repository.insertIDs(stringIngredientsIDs, DishID);
  }

  #utils = {
    filterIngredients: async (newIngredients) => {
      const allIngredients = await this.repository.select();

      const filteredIngredients = newIngredients
      .map(ingredient => ( {name: ingredient} ))
      .filter(newIngredient => (
            !allIngredients.find( ingredient => ingredient.name === newIngredient.name )
          )
        )

      return filteredIngredients
    }
  };

}

module.exports = CreateIngredientServices;