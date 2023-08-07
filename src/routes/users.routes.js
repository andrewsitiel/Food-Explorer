const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UsersController = require("../controllers/usersController");
const { Router } = require('express');

const controller = new UsersController();
const router = Router();

router.post("/", controller.create);

module.exports = router;