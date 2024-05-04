-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_postId_fkey`;

-- AlterTable
ALTER TABLE `responsepost` MODIFY `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `ResponsePost` ADD CONSTRAINT `ResponsePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
