const AccessController = require("../controllers/accessController");
const { Router } = require("express");

const controller = new AccessController();
const router = Router();

router.post("/", controller.create);

module.exports = router;