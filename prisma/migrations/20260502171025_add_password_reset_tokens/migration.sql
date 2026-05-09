-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `id_password_reset_token` INTEGER NOT NULL AUTO_INCREMENT,
    `id_usuario` INTEGER NOT NULL,
    `token_hash` VARCHAR(255) NOT NULL,
    `usado` BOOLEAN NOT NULL DEFAULT false,
    `fecha_expiracion` DATETIME(3) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_uso` DATETIME(3) NULL,

    PRIMARY KEY (`id_password_reset_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
