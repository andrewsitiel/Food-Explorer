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

  async update(request, response) {
    const { order_id, status } = request.body;

    await orderServices.update(order_id, status);

    return response.status(200).json({})
  }
}

module.exports = OrdersController;