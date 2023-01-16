const { Router } = require("express");
const router = Router();

const OrdersController = require("../controllers/ordersController");
const controller = new OrdersController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.post("/", ensureAuthenticated, controller.create);

module.exports = router;