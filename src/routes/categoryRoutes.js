const express = require('express');
const { authenticateToken, validate } = require('../middleware');
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require('../validations/categoryValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .post([hasPermission('create_category'), validate(createCategorySchema)], createCategory)
  .get([hasPermission('view_categories')], getAllCategories);

router
  .route('/:idOrSlug')
  .get([hasPermission('view_category')], validate(getCategorySchema), getCategory)
  .patch([hasPermission('edit_category'), validate(updateCategorySchema)], updateCategory)
  .delete([hasPermission('delete_category'), validate(deleteCategorySchema)], deleteCategory);

module.exports = router;
