const knex = require("../database/knex");
class DishesRepository {
  async select(){
    return await knex("dishes").select("name", "description", "ingredients_id", "category", "image"," price");
  }

  async insert(newDish) {
    const id = await knex("dishes").insert(newDish);
    
    return id
  }
}

module.exports = DishesRepository;