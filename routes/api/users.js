const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
    .get(usersController.findAll)
    .post(usersController.create);

// Matches with "/api/users/:id"
router.route("/:id")
    .put(usersController.update)
    .delete(usersController.remove);

//Matches with "/api/users/:email"
router.route("/:email")
    .get(usersController.findByEmail);

module.exports = router;