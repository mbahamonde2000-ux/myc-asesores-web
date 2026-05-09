-- CreateTable
CREATE TABLE `sesiones_activas` (
    `id_sesion_activa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `rol` VARCHAR(100) NOT NULL,
    `ip` VARCHAR(100) NULL,
    `user_agent` VARCHAR(500) NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,
    `fecha_inicio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_ultima_act` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_cierre` DATETIME(3) NULL,

    UNIQUE INDEX `sesiones_activas_token_key`(`token`),
    PRIMARY KEY (`id_sesion_activa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sesiones_activas` ADD CONSTRAINT `sesiones_activas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
