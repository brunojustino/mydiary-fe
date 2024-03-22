/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Diary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Diary_date_key` ON `Diary`;

-- CreateIndex
CREATE UNIQUE INDEX `Diary_userId_date_key` ON `Diary`(`userId`, `date`);
