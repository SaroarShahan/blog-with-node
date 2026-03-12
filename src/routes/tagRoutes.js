const express = require('express');

const tagController = require('../controllers/tagController');
const { authenticateToken, isAdmin } = require('../middleware');

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, isAdmin, tagController.createTag])
  .get(tagController.getAllTags);

router
  .route('/:idOrSlug')
  .get(tagController.getTag)
  .patch([authenticateToken, isAdmin, tagController.updateTag])
  .delete([authenticateToken, isAdmin, tagController.deleteTag]);

module.exports = router;
