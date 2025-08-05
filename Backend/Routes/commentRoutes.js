const express = require('express');
const auth = require('../middlewares/requireAuth');
const { addComment, getComments } = require('../controllers/commentController');

const router = express.Router();

router.get('/:id', getComments);
router.post('/:id', auth, addComment);

module.exports = router;
