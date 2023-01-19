const AppError = require("../../utils/AppError");
const authConfig = require("../../config/jwt");

const { sign } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const { hash } = require("bcrypt");

class CreateUserServices {
  constructor(repository) {
    this.repository = repository;
  }

  async index(user_id) {
    const user = await this.#utils.getUser(user_id);
    const favoritesIDs = user.favorites_dishes_id.split(",");

    const favoritesDishes = await this.#utils.getDishesById(favoritesIDs)

    return favoritesDishes
  }

  async create ({name, email, password}) {
    const checkEmailExists = await this.repository.findByEmail(email);
    
    if(checkEmailExists) {
      throw new AppError("Este e-mail já está em uso, por favor, tente novamente com outro e-mail.");
    }

    
    if(!name || !email || !password) {
      throw new AppError("Por favor, informe todos os dados necessários (Nome, E-mail, Senha)")
    }

    const hashedPassword = await hash(password, 8);

    await this.repository.insert({ name, email, hashedPassword });

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

  async update(favorites, user_id) {
    
    const dishesIDs = await this.#utils.getDishesByName(favorites)

    await this.repository.update(dishesIDs, user_id);

    return 
  }

  #utils = {
    getDishesByName: async (favorites) => {
      const allDishes= await this.repository.indexDishes();

      const dishesIDs = allDishes
      .filter(dish => (
          favorites.find( favorite => dish.name === favorite)
        )
      )
      .map(dish => dish.id)

      return dishesIDs.toString()
    },

    getDishesById: async (favorites) => {
      const allDishes= await this.repository.indexDishes();

      const favoriteDishes = allDishes
      .filter(dish => (
          favorites.find( favoriteId => dish.id == favoriteId)
        )
      )

      return favoriteDishes
    },

    getUser: async (user_id) => {
      return await this.repository.select(user_id);
    }

  };
}

module.exports = CreateUserServices;