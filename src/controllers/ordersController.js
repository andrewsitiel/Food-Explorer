const CreateOrderServices = require("../services/orderServices/CreateOrderService");
const OrderRepository = require("../repositories/OrderRepository");

const orderRepository = new OrderRepository()
const orderServices = new CreateOrderServices(orderRepository);

class OrdersController {
  async create(request, response) {
    const { description } = request.body;
    const user_id = request.user.id;

    const newOrder = await orderServices.create(user_id, description);
      
    return response.status(201).json(newOrder)
  }
}

module.exports = OrdersController;