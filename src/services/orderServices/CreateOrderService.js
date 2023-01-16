
class CreateOrderServices{
  
  constructor(repository) {
    this.repository = repository;
  }

  async create(user_id, description) {
    const newOrder = {
      id: this.#utils.generateUniqueIdentifier(),
      user_id: Number(user_id),
      description,
      status: "Pendente"
    }
 
    await this.repository.insert(newOrder);

    return newOrder;
  }

  #utils = {
    generateUniqueIdentifier: () => {
      return (Date.now() * (Math.random() * 10))
      .toString()
      .substring(0,9);
    }
  }
};

module.exports = CreateOrderServices;