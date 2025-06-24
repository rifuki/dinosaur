import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { Prisma, PrismaClient } from "../generated/prisma/client.ts";

const DbUrl = Deno.env.get("DATABASE_URL");
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DbUrl,
    },
  },
});

const dinosaurData: Prisma.DinosaurCreateInput[] = [{
  name: "Megalosaurus",
  description: "A large carnivorous dinosaur from the Jurassic period.",
}, {
  name: "Yutyrannus",
  description:
    "A feathered dinosaur from the Early Cretaceous period, known for its size and unique features.",
}, {
  name: "Therizinosaurus",
  description:
    "A herbivorous theropod dinosaur from the Late Cretaceous period, notable for its long claws and unique appearance.",
}];

for (const u of dinosaurData) {
  await prisma.dinosaur.create({
    data: u,
  });
  console.log(`Created dinosaur: ${u.name}`);
}

console.log("Seeding completed successfully.");

await prisma.$disconnect();
