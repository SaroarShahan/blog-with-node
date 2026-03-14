const express = require('express');

const { authenticateToken, isAdmin, validate } = require('../middleware');
const {
  createTag,
  getAllTags,
  getTag,
  updateTag,
  deleteTag,
} = require('../controllers/tagController');
const { createTagSchema, deleteTagSchema, getTagSchema, updateTagSchema } = require('../validations/tagValidation');

const router = express.Router();

router.route('/').post([authenticateToken, isAdmin, validate(createTagSchema)], createTag).get(getAllTags);

router
  .route('/:idOrSlug')
  .get(validate(getTagSchema), getTag)
  .patch([authenticateToken, isAdmin, validate(updateTagSchema)], updateTag)
  .delete([authenticateToken, isAdmin, validate(deleteTagSchema)], deleteTag);

module.exports = router;
