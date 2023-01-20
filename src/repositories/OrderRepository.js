const knex = require("../database/knex");

class OrderRepository {
  async insert(newOrder) {
    await knex("orders").insert(newOrder);
    return
  }

  async update(order_id, status) {
    await knex("orders").where({id: order_id}).update({status})
  }
};

module.exports = OrderRepository;