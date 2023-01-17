const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersController = require("../controllers/usersController");
const { Router } = require('express');

const controller = new UsersController();
const router = Router();

router.get("/", ensureAuthenticated, controller.index);
router.post("/", controller.create);
router.patch("/", ensureAuthenticated, controller.update);

module.exports = router;