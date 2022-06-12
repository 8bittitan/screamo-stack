import type { GitHubProfile } from 'remix-auth-github';
import argon2 from 'argon2';
import type { UserSession } from '@types';

import { prisma } from '~/utils/db.server';

export const createUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const findByCredentials = async (
  email: string,
  password: string,
): Promise<UserSession | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return null;
    }

    const valid = await argon2.verify(user.password ?? '', password);

    if (!valid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      displayName: user.profile?.displayName,
      name: user.profile?.name,
      avatar: user.profile?.avatar,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const findOrCreateByProfile = async (
  profile: GitHubProfile,
): Promise<UserSession | null> => {
  try {
    const {
      emails,
      displayName,
      name: { familyName },
      photos,
    } = profile;
    const [email] = emails || [{ value: '' }];

    const existingUser = await prisma.user.findUnique({
      where: { email: email.value },
      include: {
        profile: true,
      },
    });

    if (existingUser) {
      return {
        id: existingUser.id,
        email: existingUser.email,
        displayName: existingUser.profile?.displayName ?? null,
        name: existingUser.profile?.name ?? null,
        avatar: existingUser.profile?.avatar ?? null,
      };
    }

    const newUser = await prisma.user.create({
      data: {
        email: email.value,
        profile: {
          create: {
            displayName,
            name: familyName,
            avatar: photos[0].value,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return {
      id: newUser.id,
      email: newUser.email,
      displayName: newUser.profile?.displayName,
      name: newUser.profile?.name,
      avatar: newUser.profile?.avatar,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
