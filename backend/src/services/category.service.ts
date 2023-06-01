import { prisma } from "../utils/prisma";

export async function create(category: any) {
  return await prisma.category.create({
    data: {
      name: category.name,
    },
  });
}
export async function findAll() {
  return await prisma.category.findMany();
}
export async function findById(id: number) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      questions: true,
    },
  });
}
export async function update(id: number, category: any) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });
  if (!existingCategory) {
    return null;
  }
  return await prisma.category.update({
    where: {
      id: id,
    },
    data: {
      name: category.name,
    },
  });
}

export async function deleteCategory(id: number) {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });
  if (!existingCategory) {
    return null;
  }

  return await prisma.category.delete({
    where: { id },
  });
}
