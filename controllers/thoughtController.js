const { User, Thought } = require('../models');

module.exports = {
  // Grab all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create new thought
  async createNewThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } }
      );
      !user
        ? res.status(404).json({ message: 'No user with this id!' })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Update existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this Id' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove existing thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        return User.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } }
        );
      })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
  //   addReaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //   deleteReaction;
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } }
      );
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
