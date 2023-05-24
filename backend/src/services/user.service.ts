import { prisma } from "../utils/prisma"; // import your prisma instance

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRead = {
  id: number;
  name: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWrite = {
  name: string;
  email: string;
  photo: string;
};

export async function findOrCreate(user: any) {
  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.user.create({ data: user });
  return newUser;
}
export async function findAll() {
  return await prisma.user.findMany();
}
export async function findById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  });
}

export async function create(user: any) {
  return await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
  });
}

export async function update(id: number, user: any) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }

  return await prisma.user.update({
    where: { id },
    data: {
      name: user.name,
      photo: user.photo,
    },
  });
}

export async function deleteUser(id: number) {
  const existingUser = await prisma.user.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }
  return await prisma.user.delete({
    where: { id },
  });
}
