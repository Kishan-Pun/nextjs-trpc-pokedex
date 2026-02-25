import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Clearing existing data...");

  await prisma.pokemon.deleteMany(); // 👈 ADD HERE

  console.log("Fetching Pokemon...");

  for (let i = 1; i <= 150; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    await prisma.pokemon.create({
      data: {
        name: data.name,
        sprite: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
      },
    });

    console.log(`Inserted ${data.name}`);
  }

  console.log("Seeding complete 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
