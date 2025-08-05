const express = require('express');
const auth = require('../middlewares/requireAuth');
const upload = require('../middlewares/upload');
const {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  togglePublishStatus,
  getSearchBlogs, 
} = require('../controllers/blogController');

const router = express.Router();

router.get('/my-blogs', auth, getMyBlogs);
router.get('/search', getSearchBlogs);
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', auth, upload.single('image'), createBlog);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);
router.patch('/:id/toggle-publish', auth, togglePublishStatus);

module.exports = router;
