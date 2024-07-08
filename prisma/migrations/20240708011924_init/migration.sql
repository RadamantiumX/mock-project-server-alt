/*
  Warnings:

  - You are about to drop the column `responseId` on the `responsepost` table. All the data in the column will be lost.
  - Made the column `postId` on table `responsepost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_responseId_fkey`;

-- AlterTable
ALTER TABLE `responsepost` DROP COLUMN `responseId`,
    MODIFY `postId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ResponsePost` ADD CONSTRAINT `ResponsePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
