import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: "Alice Host",
      email: "alice@example.com",
      password: "password123",
      phone: "123456789",
      role: "HOST",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob Cleaner",
      email: "bob@example.com",
      password: "password123",
      phone: "987654321",
      role: "CLEANER",
    },
  });

  // Seed Properties
  const property = await prisma.property.create({
    data: {
      hostId: user1.id,
      name: "Cozy Cottage",
      address: "123 Cottage Lane",
      city: "Smalltown",
      country: "USA",
    },
  });

  // Seed Cleaner
  const cleaner = await prisma.cleaner.create({
    data: {
      userId: user2.id,
      experience: "5 years in residential cleaning",
      location: "Smalltown, USA",
      rating: 4.5,
    },
  });

  // Seed CleaningSchedule
  const schedule = await prisma.cleaningSchedule.create({
    data: {
      propertyId: property.id,
      cleanerId: cleaner.id,
      startTime: new Date("2024-12-10T09:00:00Z"),
      endTime: new Date("2024-12-10T12:00:00Z"),
      status: "SCHEDULED",
    },
  });

  // Seed Tasks
  await prisma.task.createMany({
    data: [
      {
        scheduleId: schedule.id,
        description: "Clean the living room",
        status: "PENDING",
      },
      {
        scheduleId: schedule.id,
        description: "Dust all furniture",
        status: "PENDING",
      },
    ],
  });

  // Seed Payment
  await prisma.payment.create({
    data: {
      scheduleId: schedule.id,
      amount: 150.0,
      paymentDate: new Date(),
      status: "PENDING",
    },
  });

  // Seed Feedback
  await prisma.feedback.create({
    data: {
      scheduleId: schedule.id,
      rating: 5,
      comments: "Excellent work!",
    },
  });
}

main()
  .then(() => {
    console.log("Seeding completed!");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
