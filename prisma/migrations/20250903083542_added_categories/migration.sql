/*
  Warnings:

  - Added the required column `category` to the `AnonymousMessage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('venting', 'confessions', 'lonely', 'grateful', 'anxious', 'happy', 'love', 'friendship', 'work_school', 'random', 'motivational', 'funny', 'sad', 'angry', 'health');

-- AlterTable
ALTER TABLE "public"."AnonymousMessage" ADD COLUMN     "category" "public"."Category" NOT NULL;
