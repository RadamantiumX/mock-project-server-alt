/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Favorites_videoId_key` ON `Favorites`(`videoId`);
