-- CreateTable
CREATE TABLE `cliente_actividad` (
    `id_cliente_actividad` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_actividad` INTEGER NOT NULL,
    `es_principal` BOOLEAN NOT NULL,
    `vigente` BOOLEAN NOT NULL DEFAULT true,
    `fecha_mod` DATETIME(3) NOT NULL,
    `usuario_mod` VARCHAR(100) NULL,

    PRIMARY KEY (`id_cliente_actividad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente_actividad` ADD CONSTRAINT `cliente_actividad_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id_cliente`) ON DELETE RESTRICT ON UPDATE CASCADE;
