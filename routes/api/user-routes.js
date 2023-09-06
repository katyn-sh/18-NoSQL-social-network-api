const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');


router.route('/').get(getAllUsers).post(createUser);


router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);


router.route('/:userId/friends/:friendsId').put(addFriend).delete(deleteFriend);

module.exports = router;
