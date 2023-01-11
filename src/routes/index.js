const { Router } = require("express");
const router = Router();

const userRoutes = require("./users.routes");
const accessRoute = require("./access.route");
const dishesRoutes = require("./dishes.routes");

router.use("/users", userRoutes);
router.use("/access", accessRoute);
router.use("/dishes", dishesRoutes);

module.exports = router;