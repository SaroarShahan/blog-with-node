const express = require('express');

const { authenticateToken, validate } = require('../middleware');
const {
  createTag,
  getAllTags,
  getTag,
  updateTag,
  deleteTag,
} = require('../controllers/tagController');
const {
  createTagSchema,
  deleteTagSchema,
  getTagSchema,
  updateTagSchema,
} = require('../validations/tagValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, hasPermission('create_tag'), validate(createTagSchema)], createTag)
  .get(hasPermission('view_tags'), getAllTags);

router
  .route('/:idOrSlug')
  .get([authenticateToken, hasPermission('view_tag'), validate(getTagSchema)], getTag)
  .patch([authenticateToken, hasPermission('edit_tag'), validate(updateTagSchema)], updateTag)
  .delete([authenticateToken, hasPermission('delete_tag'), validate(deleteTagSchema)], deleteTag);

module.exports = router;
