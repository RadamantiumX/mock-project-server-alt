-- DropForeignKey
ALTER TABLE `favorite` DROP FOREIGN KEY `Favorite_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `likepost` DROP FOREIGN KEY `LikePost_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `likepost` DROP FOREIGN KEY `LikePost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `likeresponse` DROP FOREIGN KEY `LikeResponse_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `likeresponse` DROP FOREIGN KEY `LikeResponse_responseId_fkey`;

-- DropForeignKey
ALTER TABLE `likevideo` DROP FOREIGN KEY `LikeVideo_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_postId_fkey`;

-- DropForeignKey
ALTER TABLE `responsepost` DROP FOREIGN KEY `ResponsePost_responseId_fkey`;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResponsePost` ADD CONSTRAINT `ResponsePost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResponsePost` ADD CONSTRAINT `ResponsePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResponsePost` ADD CONSTRAINT `ResponsePost_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `ResponsePost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeVideo` ADD CONSTRAINT `LikeVideo_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikePost` ADD CONSTRAINT `LikePost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeResponse` ADD CONSTRAINT `LikeResponse_responseId_fkey` FOREIGN KEY (`responseId`) REFERENCES `ResponsePost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeResponse` ADD CONSTRAINT `LikeResponse_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
