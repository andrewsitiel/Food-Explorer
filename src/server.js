require("express-async-errors");
require("dotenv/config");

const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.status).json({
      error: "error",
      message: error.message
    })
  }

  return response.status(500).json({
    error: "error",
    message: "Internal server error"
  })
})

const PORT = 3000;
app.listen(PORT, () => {console.log(`App running on port ${PORT}`)});