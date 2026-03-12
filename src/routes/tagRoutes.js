const express = require('express');

const { authenticateToken, isAdmin } = require('../middleware');
const {
  createTag,
  getAllTags,
  getTag,
  updateTag,
  deleteTag,
} = require('../controllers/tagController');

const router = express.Router();

router.route('/').post([authenticateToken, isAdmin], createTag).get(getAllTags);

router
  .route('/:idOrSlug')
  .get(getTag)
  .patch([authenticateToken, isAdmin], updateTag)
  .delete([authenticateToken, isAdmin], deleteTag);

module.exports = router;
