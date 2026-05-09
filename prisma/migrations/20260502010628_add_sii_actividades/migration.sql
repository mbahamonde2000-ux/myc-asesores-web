-- CreateTable
CREATE TABLE `rubro` (
    `id_rubro` INTEGER NOT NULL AUTO_INCREMENT,
    `rubro` VARCHAR(255) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_rubro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subrubro` (
    `id_subrubro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rubro` INTEGER NOT NULL,
    `subrubro` VARCHAR(255) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_subrubro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actividad` (
    `id_actividad` INTEGER NOT NULL AUTO_INCREMENT,
    `id_rubro` INTEGER NOT NULL,
    `id_subrubro` INTEGER NOT NULL,
    `codigo_sii` VARCHAR(20) NOT NULL,
    `actividad` VARCHAR(500) NOT NULL,
    `afecto_iva` BOOLEAN NOT NULL,
    `categoria` VARCHAR(100) NULL,
    `palabras_clave` TEXT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    UNIQUE INDEX `actividad_codigo_sii_key`(`codigo_sii`),
    PRIMARY KEY (`id_actividad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente_actividad` ADD CONSTRAINT `cliente_actividad_id_actividad_fkey` FOREIGN KEY (`id_actividad`) REFERENCES `actividad`(`id_actividad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subrubro` ADD CONSTRAINT `subrubro_id_rubro_fkey` FOREIGN KEY (`id_rubro`) REFERENCES `rubro`(`id_rubro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actividad` ADD CONSTRAINT `actividad_id_rubro_fkey` FOREIGN KEY (`id_rubro`) REFERENCES `rubro`(`id_rubro`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actividad` ADD CONSTRAINT `actividad_id_subrubro_fkey` FOREIGN KEY (`id_subrubro`) REFERENCES `subrubro`(`id_subrubro`) ON DELETE RESTRICT ON UPDATE CASCADE;
