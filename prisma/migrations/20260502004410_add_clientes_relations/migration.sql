-- CreateTable
CREATE TABLE `clientes` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `rut` VARCHAR(20) NOT NULL,
    `dv` VARCHAR(2) NOT NULL,
    `razon_social` VARCHAR(255) NOT NULL,
    `nom_fantasia` VARCHAR(255) NULL,
    `id_empresa_legal` INTEGER NOT NULL,
    `id_estado_cliente` INTEGER NOT NULL,
    `id_riesgo_cliente` INTEGER NOT NULL,
    `id_relacion_comercial` INTEGER NOT NULL,
    `id_tam_empresa` INTEGER NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    UNIQUE INDEX `clientes_rut_key`(`rut`),
    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_empresa_legal` (
    `Id_empresa_legal` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(20) NOT NULL,
    `tipo_empresa` VARCHAR(100) NOT NULL,
    `tamano` VARCHAR(50) NULL,
    `descripcion` VARCHAR(255) NULL,
    `ley` VARCHAR(100) NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`Id_empresa_legal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riesgo_cliente` (
    `id_riesgo_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `riesgo_cliente` VARCHAR(100) NOT NULL,
    `descripcion_riesgo_cliente` VARCHAR(255) NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_riesgo_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relacion_comercial` (
    `id_relacion_comercial` INTEGER NOT NULL AUTO_INCREMENT,
    `relacion_comercial` VARCHAR(100) NOT NULL,
    `descripcion_relacion_cliente` VARCHAR(255) NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_relacion_comercial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tamano_empresa` (
    `id_tam_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `tam_empresa` VARCHAR(50) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_tam_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_id_estado_cliente_fkey` FOREIGN KEY (`id_estado_cliente`) REFERENCES `cliente_estado`(`id_estado_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_id_empresa_legal_fkey` FOREIGN KEY (`id_empresa_legal`) REFERENCES `tipo_empresa_legal`(`Id_empresa_legal`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_id_riesgo_cliente_fkey` FOREIGN KEY (`id_riesgo_cliente`) REFERENCES `riesgo_cliente`(`id_riesgo_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_id_relacion_comercial_fkey` FOREIGN KEY (`id_relacion_comercial`) REFERENCES `relacion_comercial`(`id_relacion_comercial`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clientes` ADD CONSTRAINT `clientes_id_tam_empresa_fkey` FOREIGN KEY (`id_tam_empresa`) REFERENCES `tamano_empresa`(`id_tam_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;
