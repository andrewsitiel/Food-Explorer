const knex = require("../database/knex");
class DishesRepository {
  async select(){
    return await knex("dishes").select("name", "description", "ingredients_id", "category", "avatar"," price");
  }

  async insert({name, description, category, price}) {
    const id = await knex("dishes").insert({name, description, category, price});
    
    return id
  }
}

module.exports = DishesRepository;