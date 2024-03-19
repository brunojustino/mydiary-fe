/*
  Warnings:

  - A unique constraint covering the columns `[date]` on the table `Diary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Diary` ADD COLUMN `date` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Diary_date_key` ON `Diary`(`date`);
