-- CreateTable
CREATE TABLE `region` (
    `id_region` INTEGER NOT NULL AUTO_INCREMENT,
    `nro` INTEGER NOT NULL,
    `region` VARCHAR(150) NOT NULL,
    `capital` VARCHAR(100) NULL,
    `zona` VARCHAR(50) NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_region`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id_provincia` INTEGER NOT NULL AUTO_INCREMENT,
    `id_region` INTEGER NOT NULL,
    `provincia` VARCHAR(150) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_provincia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comuna` (
    `id_comuna` INTEGER NOT NULL AUTO_INCREMENT,
    `id_region` INTEGER NOT NULL,
    `id_provincia` INTEGER NOT NULL,
    `comuna` VARCHAR(150) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_comuna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direccion_cliente` (
    `id_dircli` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_tipo_dir` INTEGER NOT NULL,
    `calle` VARCHAR(150) NOT NULL,
    `numero` VARCHAR(30) NULL,
    `id_region` INTEGER NOT NULL,
    `id_provincia` INTEGER NOT NULL,
    `id_comuna` INTEGER NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_dircli`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_direccion` (
    `id_tipo_dir` INTEGER NOT NULL AUTO_INCREMENT,
    `Tipo_dir` VARCHAR(100) NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_tipo_dir`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provincia` ADD CONSTRAINT `provincia_id_region_fkey` FOREIGN KEY (`id_region`) REFERENCES `region`(`id_region`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comuna` ADD CONSTRAINT `comuna_id_region_fkey` FOREIGN KEY (`id_region`) REFERENCES `region`(`id_region`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comuna` ADD CONSTRAINT `comuna_id_provincia_fkey` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id_provincia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_cliente` ADD CONSTRAINT `direccion_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_cliente` ADD CONSTRAINT `direccion_cliente_id_region_fkey` FOREIGN KEY (`id_region`) REFERENCES `region`(`id_region`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_cliente` ADD CONSTRAINT `direccion_cliente_id_provincia_fkey` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id_provincia`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_cliente` ADD CONSTRAINT `direccion_cliente_id_comuna_fkey` FOREIGN KEY (`id_comuna`) REFERENCES `comuna`(`id_comuna`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `direccion_cliente` ADD CONSTRAINT `direccion_cliente_id_tipo_dir_fkey` FOREIGN KEY (`id_tipo_dir`) REFERENCES `tipo_direccion`(`id_tipo_dir`) ON DELETE RESTRICT ON UPDATE CASCADE;
