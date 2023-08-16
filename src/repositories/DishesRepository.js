const knex = require("../database/knex");
class DishesRepository {
  async select() {
    return await knex("dishes").select("id", "name", "description", "ingredients_id", "category", "image", " price");
  }

  async show(id) {
    return await knex("dishes").where({ id }).first("id", "name", "description", "ingredients_id", "category", "image", " price");
  }

  async insert({ name, description, category, price, image }) {
    const id = await knex("dishes").insert({ name, description, category, price, image });

    return id
  }

  async update({ id, name, description, category, price }) {
    await knex("dishes").where({ id }).update({ name, description, category, price });

    return
  }

  async patch({ id, filename: image }) {
    await knex("dishes").where({ id }).update({ image })

    return
  }

  async delete(id) {
    await knex("dishes").where({ id }).delete();
  }
}

module.exports = DishesRepository;