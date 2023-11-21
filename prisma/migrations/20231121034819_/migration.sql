/*
  Warnings:

  - The primary key for the `UserTournament` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserTournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserTournament" DROP CONSTRAINT "UserTournament_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserTournament_pkey" PRIMARY KEY ("userId", "tournamentId");
