const router = require("express").Router();
const userRoutes = require("./users");

// User routers
router.use("/users", userRoutes);

module.exports = router;
