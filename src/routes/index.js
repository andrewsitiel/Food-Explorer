const { Router } = require("express");
const router = Router();

const userRoutes = require("./users.routes");
const accessRoute = require("./access.route");
const dishesRoutes = require("./dishes.routes");
const orderRoutes = require("./orders.routes");

router.use("/user", userRoutes);
router.use("/access", accessRoute);
router.use("/dishes", dishesRoutes);
router.use("/orders", orderRoutes);

module.exports = router;