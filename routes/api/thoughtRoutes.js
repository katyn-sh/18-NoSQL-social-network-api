const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

//grab all thoughts
//api/thoughts
router.route('/').get(getAllThoughts).post(createNewThought);

//api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').put(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
