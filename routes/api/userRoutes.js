const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addAfriend,
  removeAfriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/userID
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);

//add a friend and delete a friend
//  /api/users/:userid/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addAfriend)
  .delete(removeAfriend);

module.exports = router;
