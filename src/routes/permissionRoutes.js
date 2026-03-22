const express = require('express');

const permissionController = require('../controllers/permissionController');
const { authenticateToken, validate } = require('../middleware');
const { getPermissionsSchema } = require('../validations/permissionValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .get(
    hasPermission('view_permissions'),
    validate(getPermissionsSchema),
    permissionController.getPermissions,
  );

module.exports = router;
