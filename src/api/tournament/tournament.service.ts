import { PrismaClient } from '@prisma/client';

import { Tournament } from './tournament.types'

const prisma = new PrismaClient()

export async function getAllTournaments() {

  const tournaments = await prisma.tournament.findMany({
    select: {
      id: true,
      name: true,
      details: true,
    }
  });
  return tournaments;
}

export async function createTournaments(input: Tournament) {
  const tournament = await prisma.tournament.create({
    data: {
      name: input.name,
      details: input.details,
    }
  })

  return tournament
}

export async function getTournamentById(id: string) {
  const tournament = await prisma.tournament.findUnique({
    where: {
      id,
    },
  });

  return tournament;
};

export async function updateTournament(id: string, input: any) {
  const tournament = await prisma.tournament.update({
    where: {
      id,
    },
    data: input,
  });

  return tournament;
}

export async function deleteTournament(id: string) {
  const tournament = await prisma.tournament.delete({
    where: {
      id,
    },
  });

  return tournament;
}