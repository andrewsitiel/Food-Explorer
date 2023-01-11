const { Router } = require("express");
const DishesController = require("../controllers/dishesController");

const router = Router();
const controller = new DishesController();

router.get("/", controller.index);
router.post("/", controller.create);

module.exports = router;