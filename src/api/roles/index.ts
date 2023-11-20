import { Router } from 'express';
import { getAllRolesHandler, createRoleHnadler } from './roles.controller';

const router = Router();

router.get('/', getAllRolesHandler);
router.post('/', createRoleHnadler);

export default router;
