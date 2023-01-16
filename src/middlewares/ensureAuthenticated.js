const AppError = require("../utils/AppError");
const authConfig = require("../config/jwt");
const { verify } = require("jsonwebtoken");

function ensureAuthenticated (request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Você não está autorizado a fazer esta requisição sem um JWT.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const {sub: user_id} = verify(token, authConfig.secret);

    request.user = {
      id: user_id
    }

    return next() 
  } catch (error) {
    throw new AppError(error.message, 401);
  }
}

module.exports = ensureAuthenticated;