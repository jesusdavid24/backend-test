import { Router } from "express";
import { 
  getAllTournamentsHandler,
  createTournamentsHandler,
  deleteTournamentHandler,
  updateTournamentHandler
} from "./tournament.controller";
import { isAuthenticated } from '../../auth/auth.controller';
import { hasRole } from '../../auth/auth.controller';

const router = Router()

router.get('/', isAuthenticated, hasRole(['ADMIN']), getAllTournamentsHandler)
router.post('/', isAuthenticated, hasRole(['ADMIN']), createTournamentsHandler)
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), deleteTournamentHandler)
router.put('/:id', isAuthenticated, hasRole(['ADMIN']), updateTournamentHandler)

export default router