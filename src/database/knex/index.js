const knexConfig = require("./knexfile");
const knex = require("knex");

const knexConnection = knex(knexConfig.development)

module.exports = knexConnection;