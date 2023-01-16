const { Router } = require("express");
const DishesController = require("../controllers/dishesController");

const router = Router();
const controller = new DishesController();
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

router.get("/", ensureAuthenticated, controller.index);
router.post("/", ensureAuthenticated, controller.create);

module.exports = router;