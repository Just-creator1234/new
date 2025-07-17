// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: "breaking", name: "Breaking", slug: "breaking" },
  { id: "politics", name: "Politics", slug: "politics" },
  { id: "tech", name: "Tech", slug: "tech" },
  { id: "sports", name: "Sports", slug: "sports" },
  { id: "business", name: "Business", slug: "business" },
  { id: "world", name: "World", slug: "world" },
];

async function main() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
      },
    });
  }
  console.log("✅ Categories seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding categories:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
