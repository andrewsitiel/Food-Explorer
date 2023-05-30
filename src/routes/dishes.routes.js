const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const DishesController = require("../controllers/dishesController");
const uploadConfig = require("../config/upload");
const { Router } = require("express");
const multer = require("multer");

const router = Router();
const controller = new DishesController();
const upload = multer(uploadConfig.MULTER);


router.get("/", ensureAuthenticated, controller.index);
router.get("/:id", ensureAuthenticated, controller.show);
router.post("/", ensureAuthenticated, upload.single("image"), controller.create);

module.exports = router;