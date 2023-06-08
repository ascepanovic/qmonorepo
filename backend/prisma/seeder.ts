import { prisma } from "../src/utils/prisma";

async function seed() {
  try {
    const category1 = await prisma.category.create({
      data: {
        name: "Science",
      },
    });

    const category2 = await prisma.category.create({
      data: {
        name: "History",
      },
    });

    const category3 = await prisma.category.create({
      data: {
        name: "Geography",
      },
    });

    const category4 = await prisma.category.create({
      data: {
        name: "Sports",
      },
    });

    const questionsData = [
      {
        text: "What is the chemical symbol for gold?",
        categoryId: category1.id,
        answers: [
          { text: "Au", isCorrect: true },
          { text: "Ag", isCorrect: false },
          { text: "Fe", isCorrect: false },
          { text: "Hg", isCorrect: false },
        ],
      },
      {
        text: "In which year did World War I end?",
        categoryId: category2.id,
        answers: [
          { text: "1918", isCorrect: true },
          { text: "1914", isCorrect: false },
          { text: "1945", isCorrect: false },
          { text: "1939", isCorrect: false },
        ],
      },
      {
        text: "What is the capital city of Australia?",
        categoryId: category3.id,
        answers: [
          { text: "Canberra", isCorrect: true },
          { text: "Sydney", isCorrect: false },
          { text: "Melbourne", isCorrect: false },
          { text: "Perth", isCorrect: false },
        ],
      },
      {
        text: "Which country won the FIFA World Cup in 2018?",
        categoryId: category4.id,
        answers: [
          { text: "France", isCorrect: true },
          { text: "Germany", isCorrect: false },
          { text: "Brazil", isCorrect: false },
          { text: "Argentina", isCorrect: false },
        ],
      },
      {
        text: "What is the chemical symbol for iron?",
        categoryId: category1.id,
        answers: [
          { text: "Fe", isCorrect: true },
          { text: "Au", isCorrect: false },
          { text: "Ag", isCorrect: false },
          { text: "Hg", isCorrect: false },
        ],
      },
      {
        text: "Which year did Christopher Columbus discover America?",
        categoryId: category2.id,
        answers: [
          { text: "1492", isCorrect: true },
          { text: "1776", isCorrect: false },
          { text: "1812", isCorrect: false },
          { text: "1945", isCorrect: false },
        ],
      },
      {
        text: "What is the largest desert in the world?",
        categoryId: category3.id,
        answers: [
          { text: "Sahara Desert", isCorrect: true },
          { text: "Gobi Desert", isCorrect: false },
          { text: "Atacama Desert", isCorrect: false },
          { text: "Antarctic Desert", isCorrect: false },
        ],
      },
      {
        text: "Which country won the UEFA Euro 2020?",
        categoryId: category4.id,
        answers: [
          { text: "Italy", isCorrect: true },
          { text: "England", isCorrect: false },
          { text: "Germany", isCorrect: false },
          { text: "France", isCorrect: false },
        ],
      },
    ];

    for (const questionData of questionsData) {
      const question = await prisma.questions.create({
        data: {
          text: questionData.text,
          categories: {
            create: {
              category: {
                connect: {
                  id: questionData.categoryId,
                },
              },
            },
          },
        },
      });

      await prisma.answers.createMany({
        data: questionData.answers.map((answer) => ({
          text: answer.text,
          is_correct: answer.isCorrect,
          question_id: question.id,
        })),
      });
    }

    console.log("Seed data created successfully");
  } catch (error) {
    console.error("Error creating seed data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
