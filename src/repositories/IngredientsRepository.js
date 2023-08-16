const knex = require("../database/knex");

class ingredientRepository {
  async select() {
    return knex("ingredients").select("*");
  }

  async show(names) {
    return await knex("ingredients").select("id").whereIn("name", names);
  }

  async insert(filteredIngredients) {
    await knex("ingredients").insert(filteredIngredients);
  }

  async insertIDs(stringIngredientsIDs, DishID) {
    await knex("dishes").where({ id: DishID }).update("ingredients_id", stringIngredientsIDs);
  }

  async delete(deletableIngredients) {
    await knex("ingredients").whereIn("id", deletableIngredients).delete();
  }
}

module.exports = ingredientRepository;