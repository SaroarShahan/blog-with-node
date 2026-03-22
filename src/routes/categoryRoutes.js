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

router
  .route('/')
  .post(
    [authenticateToken, hasPermission('create_category'), validate(createCategorySchema)],
    createCategory,
  )
  .get([hasPermission('view_categories')], getAllCategories);

router
  .route('/:idOrSlug')
  .get(
    [authenticateToken, hasPermission('view_category')],
    validate(getCategorySchema),
    getCategory,
  )
  .patch(
    [authenticateToken, hasPermission('edit_category'), validate(updateCategorySchema)],
    updateCategory,
  )
  .delete(
    [authenticateToken, hasPermission('delete_category'), validate(deleteCategorySchema)],
    deleteCategory,
  );

module.exports = router;
