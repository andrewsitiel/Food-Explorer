const knex = require("../database/knex");
class DishesRepository {
  async index(){
    return await knex("dishes").select("name", "description", "ingredients", "category", "avatar"," price");
  }

  async insert({name, description, category, price}){
    await knex("dishes").insert({name, description, category, price});
    
    return
  }
}

module.exports = DishesRepository;