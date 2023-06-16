import { prisma } from "../utils/prisma";

export async function create(answer: any) {
  return await prisma.answers.create({
    data: {
      text: answer.text,
      is_correct: answer.isCorrect,
      question: {
        connect: { id: answer.questionId },
      },
    },
  });
}
export async function findAll() {
  return await prisma.answers.findMany({
    include: { question: true },
  });
}
export async function findAnswerById(id: number) {
  return await prisma.answers.findUnique({
    where: {
      id,
    },
    include: {
      question: true,
    },
  });
}
export async function update(id: number, answer: any) {
  const existingAnswer = await prisma.answers.findUnique({
    where: { id },
  });
  if (!existingAnswer) {
    return null;
  }
  return await prisma.answers.update({
    where: {
      id,
    },
    data: {
      text: answer.text,
      is_correct: answer.isCorrect,
      question_id: answer.questionId,
    },
    include: {
      question: true,
    },
  });
}

export async function deleteAnswer(id: number) {
  const existingUser = await prisma.answers.findUnique({
    where: { id },
  });
  if (!existingUser) {
    return null;
  }
  return await prisma.answers.delete({
    where: { id },
  });
}
