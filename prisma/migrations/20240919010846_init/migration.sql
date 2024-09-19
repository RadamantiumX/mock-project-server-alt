/*
  Warnings:

  - Added the required column `like` to the `LikePost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like` to the `LikeResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LikePost" ADD COLUMN     "like" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "LikeResponse" ADD COLUMN     "like" BOOLEAN NOT NULL;
