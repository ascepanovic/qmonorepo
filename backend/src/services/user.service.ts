import { prisma } from "../utils/prisma"; // import your prisma instance

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = {
  name: string;
  email: string;
  photo: string;
};

export async function findOrCreate(user: any) {
  const existingUser = await prisma.users.findUnique({
    where: { email: user.email },
  });
  if (existingUser) {
    return existingUser;
  }

  const newUser = await prisma.users.create({ data: user });
  return newUser;
}
export async function findAll() {
  return await prisma.users.findMany();
}
export async function findById(id: number) {
  return await prisma.users.findUnique({
    where: { id },
  });
}

export async function create(user: any) {
  return await prisma.users.create({
    data: {
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
  });
}

export async function update(id: number, user: any) {
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }

  return await prisma.users.update({
    where: { id },
    data: {
      name: user.name,
      photo: user.photo,
    },
  });
}

export async function deleteUser(id: number) {
  const existingUser = await prisma.users.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }
  return await prisma.users.delete({
    where: { id },
  });
}
