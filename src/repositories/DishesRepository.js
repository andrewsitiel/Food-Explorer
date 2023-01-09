const knex = require("../database/knex");

class DishesRepository {
  async index(){
    return await knex("dishes").select("name", "description", "ingredients", "category", "avatar"," price");
  }
}

module.exports= DishesRepository;