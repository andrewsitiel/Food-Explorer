const UserRepository = require("../repositories/UserRepository");
const AppError = require("../utils/AppError");

async function isAuthorized(request, response, next) {
  const { id } = request.user;

  const userRepository = new UserRepository();

  const user = await userRepository.select(id);

  if (!user.admin) {
    throw new AppError("Você não tem autorização para executar essa ação.", 401)
  }

  return next()
}

module.exports = isAuthorized;