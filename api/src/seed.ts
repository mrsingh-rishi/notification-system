import prisma from "./prisma/src/prisma";

async function seed() {
  const user = {
    email: process.env.EMAIL || "",
    mobileNumber: process.env.MOBILE || "",
    name: "Rishi Singh",
  };

  const createdUser = await prisma.user.create({
    data: user,
  });

  await prisma.notificationPreferences.create({
    data: {
      userId: createdUser.id,
      email: true,
      whatsapp: true,
      sms: true,
    },
  });

  console.log("SEEDING Complete");
}

seed();
