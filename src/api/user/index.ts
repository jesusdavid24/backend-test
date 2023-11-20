import { Router } from 'express';
import { checkSchema } from 'express-validator';

import {
  createUserHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserHandler,
  updateUserHandler,
} from './user.controller';
import { isAuthenticated } from '../../auth/auth.controller';
import { hasRole } from '../../auth/auth.controller';

const router = Router();

// /api/users -> GET
router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllUserHandler);

router.post('/', 
  checkSchema({
    email: {
      notEmpty: {
        errorMessage: 'email is required',
      },
      isEmail: {
        errorMessage: 'invalid email, verify format',
      },
    },
    password: {
      notEmpty: {
        errorMessage: 'password is required',
      },
      isLength: {
        options: { min: 8 },
        errorMessage: 'Password should be at least 8 chars'
      },
      custom: {
        options: (value) => {
          return  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)
        },
        errorMessage: 'La contraseña debe tener al menos 8 caracteres, una letra y un número'
      }
    }
  })
, createUserHandler);

// /api/users/single -> GET
router.get('/single', isAuthenticated, getUserHandler);

// /api/users/ -> DELETE
router.delete('/', isAuthenticated, hasRole(['ADMIN']), deleteUserHandler);

// /api/users/ -> PATCH
router.patch('/', isAuthenticated, hasRole(['ADMIN', 'USER']), updateUserHandler);

export default router;
