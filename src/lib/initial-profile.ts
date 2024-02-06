import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  if (profile) {
    return profile;
  }

  const generateRandomUsernumber = () => {
    return Math.floor(Math.random() * 9000) + 1000;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.lastName || ""} ${user.firstName || `User ${generateRandomUsernumber()}`}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile;
}