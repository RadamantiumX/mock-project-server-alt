/*
  Warnings:

  - Added the required column `nickname` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `ResponsePost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `nickname` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `responsepost` ADD COLUMN `nickname` VARCHAR(191) NOT NULL;
