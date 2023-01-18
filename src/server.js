require("express-async-errors");
require("dotenv/config");

const { UPLOAD_FOLDER } = require("../src/config/upload");
const AppError = require("./utils/AppError");
const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use("/files", express.static(UPLOAD_FOLDER));

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