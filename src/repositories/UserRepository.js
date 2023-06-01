const knex = require("../database/knex");

class UserRepository {

  async select(user_id) {
    return await knex("users").where({id: user_id}).first();
  }

  async insert({ name, email, hashedPassword: password }) {
    await knex("users").insert({ name, email, password })
    return
  }

  async findByEmail(email) {
    return await knex("users").where({email}).first();
  }

  async update(favorites, user_id) {
    await knex("users").update("favorites_dishes_id", favorites).where({id: user_id})
    return
  }

  async indexDishes() {
    return await knex("dishes").select("*");
  }
}

module.exports = UserRepository;