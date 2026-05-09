/*
  Warnings:

  - You are about to drop the column `created_at` on the `cliente_estado` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `cliente_estado` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `cliente_estado` table. All the data in the column will be lost.
  - Added the required column `estado_cliente` to the `cliente_estado` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_mod` to the `cliente_estado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente_estado` DROP COLUMN `created_at`,
    DROP COLUMN `nombre`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `descripcion_estado_cliente` VARCHAR(255) NULL,
    ADD COLUMN `estado_cliente` VARCHAR(100) NOT NULL,
    ADD COLUMN `fecha_mod` DATETIME(3) NOT NULL,
    ADD COLUMN `usuario_mod` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `tipo_tel` (
    `id_tipo_tel` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_tel` VARCHAR(100) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_tipo_tel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_contacto` (
    `id_estado_cont` INTEGER NOT NULL AUTO_INCREMENT,
    `Estado_contacto` VARCHAR(100) NOT NULL,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_estado_cont`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_contacto` (
    `id_tipo_contacto` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_contacto` VARCHAR(100) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_tipo_contacto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `rol` VARCHAR(100) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
