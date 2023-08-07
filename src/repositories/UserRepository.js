const knex = require("../database/knex");

class UserRepository {

  async select(user_id) {
    return await knex("users").where({ id: user_id }).first();
  }

  async insert({ name, email, hashedPassword: password }) {
    await knex("users").insert({ name, email, password })
    return
  }

  async findByEmail(email) {
    return await knex("users").where({ email }).first();
  }
}

module.exports = UserRepository;