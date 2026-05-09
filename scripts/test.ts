import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const estado = await prisma.clienteEstado.create({
    data: {
      nombre: "Activo",
      vigente: true,
    },
  });

  console.log("Estado creado:", estado);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });