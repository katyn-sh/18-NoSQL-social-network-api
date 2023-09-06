const { User } = require('../models');
//   addFriend,
//   deleteFriend;
module.exports = {
  // Get all Users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  //Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No course with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  //  deleteUser,
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.deleteMany({ _id: { $in: User.thought } });
      })
      .then(() => {
        res.json({ message: 'User deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },
  //   addFriend,
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendsId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  //   deleteFriend;
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendsId } }
    )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
