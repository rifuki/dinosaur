import "https://deno.land/std@0.203.0/dotenv/load.ts";
import { PrismaClient } from "./generated/prisma/client.ts";
import { Application, Router } from "@oak/oak";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: Deno.env.get("DATABASE_URL"),
    },
  },
});

const app = new Application();
const router = new Router();

router.get("/", (context) => {
  context.response.body = "Welcome to the Dinosaur API!";
})
  .get("/dinosaurs", async (context) => {
    const dinosaurs = await prisma.dinosaur.findMany();
    context.response.body = dinosaurs;
  })
  .get("/dinosaurs/:id", async (context) => {
    const id = context.params.id;
    const dinosaur = await prisma.dinosaur.findUnique({
      where: {
        id: Number(id),
      },
    });
    context.response.body = dinosaur;
  })
  .post("/dinosaurs", async (context) => {
    const { name, description } = await context.request.body.json();
    const result = await prisma.dinosaur.create({
      data: { name, description },
    });
    context.response.body = result;
  })
  .delete("/dinosaurs/:id", async (context) => {
    const id = context.params.id;
    const result = await prisma.dinosaur.delete({
      where: {
        id: Number(id),
      },
    });
    context.response.body = result;
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
