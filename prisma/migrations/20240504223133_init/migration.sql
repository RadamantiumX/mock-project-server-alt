/*
  Warnings:

  - You are about to drop the `likepost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `likepost` DROP FOREIGN KEY `LikePost_authorId_fkey`;

-- DropTable
DROP TABLE `likepost`;

-- CreateTable
CREATE TABLE `LikeVideo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `videoId` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LikeVideo` ADD CONSTRAINT `LikeVideo_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
