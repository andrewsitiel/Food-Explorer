
exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id").notNullable();
  table.text("name");
  table.text("description");
  table.text("ingredients_id");
  table.text("category");
  table.text("avatar");
  table.float("price");
});

exports.down = knex => knex.schema.dropTable("dishes"); 
