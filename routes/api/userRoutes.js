const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addAfriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/userID
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//add a friend and delete a friend
router.route("/:userId/friends/:friendId").post(addAfriend);

module.exports = router;
