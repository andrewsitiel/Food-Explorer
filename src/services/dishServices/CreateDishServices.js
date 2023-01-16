class CreateDishServices{
  constructor(repository){
    this.repository = repository;
  }
  
  async index(allIngredients) {
    const allDishes = await this.repository.select();
    
    const allDishesWithIngredients = allDishes.map(dish => {
      const dishIngredientsIDs = dish.ingredients_id.split(",");
      
      const dishIngredients = allIngredients.filter(ingredient => (
        dishIngredientsIDs.find(id => {
          return id == ingredient.id
        })
      ));
      
      const dishIngredientsNames = dishIngredients.map(ingredient => ingredient.name);

      return {
        name: dish.name,
        description: dish.description,
        category: dish.category,
        avatar: dish.avatar,
        price: dish.price,
        ingredients: dishIngredientsNames
      }
    });

    return allDishesWithIngredients
  }

  async create(newDish) {
    return await this.repository.insert(newDish);
  }
}

module.exports = CreateDishServices;