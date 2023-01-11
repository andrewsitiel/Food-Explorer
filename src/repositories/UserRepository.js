const knex = require("../database/knex");

class UserRepository {
  async insert({ name, email, hashedPassword: password }) {
    await knex("users").insert({ name, email, password })
    return
  }

  async findByEmail(email) {
    return await knex("users").where({email}).first();
  }
}

module.exports = UserRepository;