const knex = require("../database/knex");

class OrderRepository {
  async insert(newOrder) {
    await knex("orders").insert(newOrder);
    return
  }
};

module.exports = OrderRepository;