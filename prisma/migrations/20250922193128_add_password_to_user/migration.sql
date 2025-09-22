/*
  Warnings:

  - Added the required column `contrasenha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "contrasenha" TEXT NOT NULL;
