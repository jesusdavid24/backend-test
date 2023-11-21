import { Request, Response } from 'express'

import { 
  getAllTournaments,
  createTournaments,
  getTournamentById,
  updateTournament,
  deleteTournament,
  registerUserToTournament
} from './tournament.service'
import errorHandler from '../../utils/errorHandler';


export async function getAllTournamentsHandler(req: Request, res: Response) {
  try {
    const tournaments = await getAllTournaments()

    return res.status(202).json({ message: 'tournaments has been found successfully', tournaments })
  } catch (exception: unknown) {
    const message = errorHandler(exception)
    res.status(400).send({ message })
  }
};

export async function createTournamentsHandler(req: Request, res: Response) {
  try {
    const data = req.body

    const tournament = await createTournaments(data)

    return res.status(201).json({ message: 'tournament has been created successfully', tournament })
  } catch (exception: unknown) {
    const message = errorHandler(exception)
    res.status(400).send({ message })
  }
};

export async function deleteTournamentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params

    const tournament = await getTournamentById(id)

    if (!tournament) {
      return res.status(404).json({
        message: 'tournament not found',
      })
    }

    await deleteTournament(id)

    return res.json(tournament)
  } catch (exception: unknown) {
    const message = errorHandler(exception)
    res.status(400).send({ message })
  }
};

export async function updateTournamentHandler(req: Request, res: Response) {
  try {
    const { id } = req.params

    const data = req.body

    const tournament = await (id)

    if (!tournament) {
      return res.status(404).json({
        message: 'tournament not found',
      })
    }

    await updateTournament(id, data)

    return res.json(tournament)
  } catch (exception: unknown) {
    const message = errorHandler(exception)
    res.status(400).send({ message })
  }
};

export async function registerPlayerTournamentHandler(req: Request, res: Response) {
  try {
    const { userId, tournamentId } = req.body
  
    const registerUser = await registerUserToTournament(userId, tournamentId)

    return res.json(registerUser)
  } catch (exception: unknown) {
    const message = errorHandler(exception)
    res.status(400).send({ message })
  }
}; 


