const express = require('express');
const categoryController = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/isAdmin');

const router = express.Router();

router
  .route('/')
  .post([authenticateToken, isAdmin, categoryController.createCategory])
  .get(categoryController.getAllCategories);

router
  .route('/:idOrSlug')
  .get(categoryController.getCategory)
  .patch([authenticateToken, isAdmin, categoryController.updateCategory])
  .delete([authenticateToken, isAdmin, categoryController.deleteCategory]);

module.exports = router;
