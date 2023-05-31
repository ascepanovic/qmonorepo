import { prisma } from "../utils/prisma";

export async function create(question: any) {
  return await prisma.questions.create({
    data: {
      text: question.text,
      categories: {
        create: {
          category_id: question.categoryId,
        },
      },
    },
  });
}
export async function findAll() {
  return await prisma.questions.findMany();
}
export async function findById(id: number) {
  return await prisma.questions.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
}
export async function update(id: number, question: any) {
  const existingQuestion = await prisma.questions.findUnique({
    where: { id },
  });
  if (!existingQuestion) {
    return null;
  }
  return await prisma.questions.update({
    where: {
      id: id,
    },
    data: {
      text: question.text,
    },
  });
}

export async function deleteQuestion(id: number) {
  const existingQuestion = await prisma.questions.findUnique({
    where: { id },
  });
  if (!existingQuestion) {
    return null;
  }
  return await prisma.questions.delete({
    where: { id },
  });
}
