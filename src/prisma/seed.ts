import { v4 as uuidv4 } from "uuid";
import { prisma } from "./client";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "organizer@eventhub.com" },
    update: {},
    create: {
      id: uuidv4(),
      email: "organizer@eventhub.com",
      name: "Organizer Demo",
    },
  });

  const categories = await Promise.all(
    ["Music", "Tech", "Sport"].map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { id: uuidv4(), name },
      })
    )
  );

  const venue1 = await prisma.venue.create({
    data: {
      id: uuidv4(),
      name: "Palais des Congrès",
      address: "1 Rue Exemple",
      city: "Paris",
    },
  });

  console.log("✅ Seed done");
  console.log("USER_ID =", user.id);
  console.log("CATEGORY_IDS =", categories.map((c) => ({ name: c.name, id: c.id })));
  console.log("VENUE_ID =", venue1.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });