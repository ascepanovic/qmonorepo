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
  return await prisma.questions.findMany({
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
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

export async function getRandomQuestion(categoryId: number) {
  const result = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      questions: {
        include: {
          question: {
            include: {
              answers: true,
            },
          },
        },
      },
    },
  });

  const questions = result?.questions.map((e) => e.question);

  if (!questions || questions.length === 0) {
    return null;
  }

  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];
  return randomQuestion;
}
export async function getQuestionsByCategoryId(categoryId: number) {
  const result = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      questions: {
        include: {
          question: {
            include: {
              answers: true,
            },
          },
        },
      },
    },
  });
  if (result) return result.questions;
}
