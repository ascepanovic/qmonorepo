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
          { text: "Ag", isCorrect: false },
          { text: "Fe", isCorrect: false },
          { text: "Hg", isCorrect: false },
          { text: "Au", isCorrect: true },
        ],
      },
      {
        text: "What is the largest planet in our solar system?",
        categoryId: category1.id,
        answers: [
          { text: "Jupiter", isCorrect: true },
          { text: "Saturn", isCorrect: false },
          { text: "Mars", isCorrect: false },
          { text: "Earth", isCorrect: false },
        ],
      },
      {
        text: "What is the unit of electrical resistance?",
        categoryId: category1.id,
        answers: [
          { text: "Volt", isCorrect: false },
          { text: "Ohm", isCorrect: true },
          { text: "Ampere", isCorrect: false },
          { text: "Watt", isCorrect: false },
        ],
      },
      {
        text: "What is the process by which plants convert sunlight into energy?",
        categoryId: category1.id,
        answers: [
          { text: "Respiration", isCorrect: false },
          { text: "Fermentation", isCorrect: false },
          { text: "Photosynthesis", isCorrect: true },
          { text: "Transpiration", isCorrect: false },
        ],
      },
      {
        text: "What is the main component of Earth's atmosphere?",
        categoryId: category1.id,
        answers: [
          { text: "Oxygen", isCorrect: false },
          { text: "Carbon dioxide", isCorrect: false },
          { text: "Argon", isCorrect: false },
          { text: "Nitrogen", isCorrect: true },
        ],
      },
      {
        text: "Which scientist proposed the theory of general relativity?",
        categoryId: category1.id,
        answers: [
          { text: "Isaac Newton", isCorrect: false },
          { text: "Stephen Hawking", isCorrect: false },
          { text: "Albert Einstein", isCorrect: true },
          { text: "Galileo Galilei", isCorrect: false },
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
        text: "In which year did World War I end?",
        categoryId: category2.id,
        answers: [
          { text: "1914", isCorrect: false },
          { text: "1945", isCorrect: false },
          { text: "1918", isCorrect: true },
          { text: "1939", isCorrect: false },
        ],
      },
      {
        text: "Which year did Christopher Columbus discover America?",
        categoryId: category2.id,
        answers: [
          { text: "1576", isCorrect: false },
          { text: "1492", isCorrect: true },
          { text: "1412", isCorrect: false },
          { text: "1645", isCorrect: false },
        ],
      },
      {
        text: "Who was the first President of the United States?",
        categoryId: category2.id,
        answers: [
          { text: "George Washington", isCorrect: true },
          { text: "Thomas Jefferson", isCorrect: false },
          { text: "Abraham Lincoln", isCorrect: false },
          { text: "John F. Kennedy", isCorrect: false },
        ],
      },
      {
        text: "Which country was the first to send a human to space?",
        categoryId: category2.id,

        answers: [
          { text: "United States", isCorrect: false },
          { text: "China", isCorrect: false },
          { text: "Germany", isCorrect: false },
          { text: "Soviet Union (Russia)", isCorrect: true },
        ],
      },
      {
        text: "Who was the leader of the Nazi Party during World War II?",
        categoryId: category2.id,

        answers: [
          { text: "Benito Mussolini", isCorrect: false },
          { text: "Joseph Stalin", isCorrect: false },
          { text: "Adolf Hitler", isCorrect: true },
          { text: "Winston Churchill", isCorrect: false },
        ],
      },
      {
        text: "In which year did the Berlin Wall fall?",
        categoryId: category2.id,

        answers: [
          { text: "1989", isCorrect: true },
          { text: "1981", isCorrect: false },
          { text: "1991", isCorrect: false },
          { text: "1985", isCorrect: false },
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
        text: "Which country is known as the 'Land of the Rising Sun'?",
        categoryId: category3.id,

        answers: [
          { text: "China", isCorrect: false },
          { text: "South Korea", isCorrect: false },
          { text: "Thailand", isCorrect: false },
          { text: "Japan", isCorrect: true },
        ],
      },
      {
        text: "What is the largest desert in the world?",
        categoryId: category3.id,

        answers: [
          { text: "Gobi Desert", isCorrect: false },
          { text: "Atacama Desert", isCorrect: false },
          { text: "Sahara Desert", isCorrect: true },
          { text: "Antarctic Desert", isCorrect: false },
        ],
      },
      {
        text: "Which river is the longest in the world?",
        categoryId: category3.id,

        answers: [
          { text: "Nile River", isCorrect: true },
          { text: "Amazon River", isCorrect: false },
          { text: "Yangtze River", isCorrect: false },
          { text: "Mississippi River", isCorrect: false },
        ],
      },
      {
        text: "Which country is the smallest in the world?",
        categoryId: category3.id,

        answers: [
          { text: "Monaco", isCorrect: false },
          { text: "Maldives", isCorrect: false },
          { text: "Nauru", isCorrect: false },
          { text: "Vatican City", isCorrect: true },
        ],
      },
      {
        text: "Mount Everest, the highest peak in the world, is located in which mountain range?",
        categoryId: category3.id,

        answers: [
          { text: "Andes", isCorrect: false },
          { text: "Rocky Mountains", isCorrect: false },
          { text: "Himalayas", isCorrect: true },
          { text: "Alps", isCorrect: false },
        ],
      },
      {
        text: "Which country won the FIFA World Cup in 2018?",
        categoryId: category4.id,
        answers: [
          { text: "Germany", isCorrect: false },
          { text: "Brazil", isCorrect: false },
          { text: "Argentina", isCorrect: false },
          { text: "France", isCorrect: true },
        ],
      },
      {
        text: "Who is the all-time leading goalscorer in international football?",
        categoryId: category4.id,

        answers: [
          { text: "Lionel Messi", isCorrect: false },
          { text: "Pelé", isCorrect: false },
          { text: "Miroslav Klose", isCorrect: false },
          { text: "Cristiano Ronaldo", isCorrect: true },
        ],
      },
      {
        text: "Which city hosted the Summer Olympics in 2016?",
        categoryId: category4.id,

        answers: [
          { text: "Rio de Janeiro", isCorrect: true },
          { text: "London", isCorrect: false },
          { text: "Tokyo", isCorrect: false },
          { text: "Beijing", isCorrect: false },
        ],
      },
      {
        text: "Which country has won the most Olympic gold medals?",
        categoryId: category4.id,

        answers: [
          { text: "China", isCorrect: false },
          { text: "Russia", isCorrect: false },
          { text: "United States", isCorrect: true },

          { text: "Germany", isCorrect: false },
        ],
      },
      {
        text: "Who holds the record for the most home runs in Major League Baseball (MLB) history?",
        categoryId: category4.id,

        answers: [
          { text: "Hank Aaron", isCorrect: false },
          { text: "Barry Bonds", isCorrect: true },

          { text: "Babe Ruth", isCorrect: false },
          { text: "Alex Rodriguez", isCorrect: false },
        ],
      },
      {
        text: "Which country won the UEFA Euro 2020?",
        categoryId: category4.id,

        answers: [
          { text: "England", isCorrect: false },
          { text: "Italy", isCorrect: true },
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
