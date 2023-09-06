const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

//api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//Add new friend to user friend's list
// api/user/:userId/friends/:friendId

//delete a friend from a user's friend's list
router.route('/:userId/friends/:friendsId').put(addFriend).delete(deleteFriend);

module.exports = router;
