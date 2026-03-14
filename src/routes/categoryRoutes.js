const express = require('express');
const { authenticateToken, isAdmin, validate } = require('../middleware');
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

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, isAdmin, validate(createCategorySchema)], createCategory)
  .get(getAllCategories);

router
  .route('/:idOrSlug')
  .get(validate(getCategorySchema), getCategory)
  .patch([authenticateToken, isAdmin, validate(updateCategorySchema)], updateCategory)
  .delete([authenticateToken, isAdmin, validate(deleteCategorySchema)], deleteCategory);

module.exports = router;
