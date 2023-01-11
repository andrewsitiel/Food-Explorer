class CreateDishesServices{
  constructor(repository){
    this.repository = repository;
  }
  
  async index() {
    const allDishes = await this.repository.index();
    return allDishes
  }

  async create(newDish) {
    await this.repository.insert(newDish);
    return
  }
}

module.exports = CreateDishesServices;