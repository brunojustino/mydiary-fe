/*
  Warnings:

  - You are about to drop the column `authorId` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `publishedDate` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `publishedDate` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `publishedDate` on the `Tasks` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Diary` DROP FOREIGN KEY `Diary_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Expenses` DROP FOREIGN KEY `Expenses_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `Tasks` DROP FOREIGN KEY `Tasks_authorId_fkey`;

-- AlterTable
ALTER TABLE `Diary` DROP COLUMN `authorId`,
    DROP COLUMN `publishedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Expenses` DROP COLUMN `authorId`,
    DROP COLUMN `publishedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tasks` DROP COLUMN `authorId`,
    DROP COLUMN `publishedDate`,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `access_token` VARCHAR(191) NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` VARCHAR(191) NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diary` ADD CONSTRAINT `Diary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tasks` ADD CONSTRAINT `Tasks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Expenses` ADD CONSTRAINT `Expenses_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
