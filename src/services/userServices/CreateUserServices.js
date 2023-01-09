const AppError = require("../../utils/AppError");
const authConfig = require("../../config/jwt");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { hash } = require("bcrypt");

class CreateUserServices {
  constructor(repository) {
    this.repository = repository;
  }

  async create ({name, email, password}) {
    const checkEmailExists = await this.repository.findByEmail(email);
    
    if(checkEmailExists) {
      throw new AppError("Este e-mail já está em uso, por favor, tent novamente com outro e-mail.");
    }

    const hashedPassword = await hash(password, 8);

    await this.repository.create({ name, email, hashedPassword });

    return
  }

  async access ({ email, password }) {
    const user = await this.repository.findByEmail(email);

    if(!user) {
      throw new AppError("E-mail ou senha inválidos. Por favor, tente novamente.");
    }

    const checkPassword = await compare(password , user.password);

    if(!checkPassword) {
      throw new AppError("E-mail ou senha inválidos. Por favor, tente novamente.");
    }

    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return {user, token}
  }
}

module.exports = CreateUserServices;