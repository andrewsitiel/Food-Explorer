const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const UserController = require("../controllers/userController");
const { Router } = require('express');

const controller = new UserController();
const router = Router();

router.post("/", controller.create);

module.exports = router;