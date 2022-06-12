import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed() {
  const email = 'testaccount123@test.com';

  await prisma.user
    .delete({ where: { email: email.toLowerCase() } })
    .catch(() => {});

  const hashedPassword = await argon2.hash('password123');

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
    },
  });

  const widgets = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    userId: user.id,
  }));

  await prisma.widget.createMany({
    data: widgets,
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
