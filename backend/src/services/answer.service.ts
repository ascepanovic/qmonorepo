import { prisma } from "../utils/prisma";
import { findById } from "./user.service";

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
export async function userAnswer(
  question: string,
  answer: string,
  isCorrect: boolean,
  gameId: number,
  userId: number
) {
  return await prisma.user_answers.create({
    data: {
      question,
      answer,

      is_correct: isCorrect,
      game_id: gameId,
      user_id: userId,
    },
  });
}
export async function findAll() {
  return await prisma.answers.findMany({
    include: { question: true },
  });
}
export async function findAnswerById(id: number) {
  const result = await prisma.answers.findUnique({
    where: {
      id,
    },
    select: {
      text: true,
      is_correct: true,
      question: {
        select: {
          text: true,
        },
      },
    },
  });
  if (result) {
    return {
      isCorrect: result.is_correct,
      question: result.question.text,
      answer: result.text,
    };
  }
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
