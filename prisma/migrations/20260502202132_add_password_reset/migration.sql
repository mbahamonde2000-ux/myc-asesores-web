/*
  Warnings:

  - The primary key for the `password_reset_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `fecha_creacion` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_expiracion` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `fecha_uso` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `id_password_reset_token` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `token_hash` on the `password_reset_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `usado` on the `password_reset_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `password_reset_tokens` DROP FOREIGN KEY `password_reset_tokens_id_usuario_fkey`;

-- DropIndex
DROP INDEX `password_reset_tokens_id_usuario_fkey` ON `password_reset_tokens`;

-- AlterTable
ALTER TABLE `password_reset_tokens` DROP PRIMARY KEY,
    DROP COLUMN `fecha_creacion`,
    DROP COLUMN `fecha_expiracion`,
    DROP COLUMN `fecha_uso`,
    DROP COLUMN `id_password_reset_token`,
    DROP COLUMN `token_hash`,
    DROP COLUMN `usado`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(150) NOT NULL,
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `token` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `password_reset_tokens_token_key` ON `password_reset_tokens`(`token`);

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
