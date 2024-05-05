/*
  Warnings:

  - Added the required column `like` to the `LikeVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `likevideo` ADD COLUMN `like` BOOLEAN NOT NULL;
