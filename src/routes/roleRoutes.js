const express = require('express');

const roleController = require('../controllers/roleController');
const { authenticateToken, validate } = require('../middleware');
const {
  createRoleSchema,
  deleteRoleSchema,
  getRoleSchema,
  updateRoleSchema,
} = require('../validations/roleValidation');
const { hasPermission } = require('../middleware/authorize');

const router = express.Router();

router.use(authenticateToken);

router
  .route('/')
  .post(hasPermission('create_role'), validate(createRoleSchema), roleController.createRole)
  .get(hasPermission('view_roles'), roleController.getRoles);

router
  .route('/:id')
  .get(hasPermission('view_role'), validate(getRoleSchema), roleController.getRole)
  .patch(hasPermission('edit_role'), validate(updateRoleSchema), roleController.updateRole)
  .delete(hasPermission('delete_role'), validate(deleteRoleSchema), roleController.deleteRole);

module.exports = router;
