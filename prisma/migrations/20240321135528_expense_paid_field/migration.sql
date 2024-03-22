/*
  Warnings:

  - You are about to drop the column `valuePaid` on the `Expenses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Expenses` DROP COLUMN `valuePaid`,
    ADD COLUMN `paid` BOOLEAN NOT NULL DEFAULT false;
