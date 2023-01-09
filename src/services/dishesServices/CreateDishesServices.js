class CreateDishesServices{
  constructor(repository){
    this.repository = repository;
  }
  
  async index() {
    const allDishes = await this.repository.index();
    return allDishes
  }
}

module.exports = CreateDishesServices;