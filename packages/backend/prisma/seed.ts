import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const statuses = [
    {
      name: 'ToDo',
      color: '#3B82F6',
      order: 1,
    },
    {
      name: 'In Progress',
      color: '#F59E0B',
      order: 2,
    },
    {
      name: 'Done',
      color: '#10B981',
      order: 3,
    },
  ];

  for (const status of statuses) {
    await prisma.status.upsert({
      where: { name: status.name },
      update: {},
      create: status,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });