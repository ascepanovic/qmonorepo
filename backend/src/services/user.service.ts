import { User } from "@prisma/client";
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
