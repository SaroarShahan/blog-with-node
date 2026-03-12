const express = require('express');
const { authenticateToken, isAdmin } = require('../middleware');
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post([authenticateToken, isAdmin], createCategory).get(getAllCategories);

router
  .route('/:idOrSlug')
  .get(getCategory)
  .patch([authenticateToken, isAdmin], updateCategory)
  .delete([authenticateToken, isAdmin], deleteCategory);

module.exports = router;
