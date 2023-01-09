const { Router } = require("express");
const router = Router();

const userRoutes = require("./users.routes");
const accessRoute = require("./access.route");

router.use("/users", userRoutes);
router.use("/access", accessRoute);

module.exports = router;