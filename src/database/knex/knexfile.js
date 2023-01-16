const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "../", "database.db")
    },
    pool: {
      afterCreate: (conn, db) => conn.run("PRAGMA foreign_keys = ON", db)
    },
    migrations:{
      directory: path.resolve(__dirname, "migrations")
    },
    useNullAsDefault: true
  },

};
