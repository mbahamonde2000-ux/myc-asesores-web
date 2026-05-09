-- CreateTable
CREATE TABLE `sesion_auditoria` (
    `id_sesion_auditoria` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NULL,
    `email` VARCHAR(150) NOT NULL,
    `resultado` VARCHAR(30) NOT NULL,
    `ip` VARCHAR(100) NULL,
    `user_agent` VARCHAR(500) NULL,
    `detalle` VARCHAR(255) NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_sesion_auditoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sesion_auditoria` ADD CONSTRAINT `sesion_auditoria_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;
