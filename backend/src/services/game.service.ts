import { prisma } from "../utils/prisma";

export async function findAll(limit: number, offset: number) {
  return await prisma.games.findMany({
    take: limit,
    skip: offset,
    include: {
      game_users: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

export async function findById(id: number) {
  return await prisma.games.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      game_users: {
        include: {
          user: true,
        },
      },
    },
  });
}
export async function getPlayersInGame(gameId: number) {
  const players = await prisma.games_by_user.findMany({
    where: {
      game_id: gameId,
    },
    include: {
      user: true,
    },
  });

  return players.map((e) => e.user);
}
export async function getPlayersScore(gameId: number) {
  const players = await prisma.games_by_user.findMany({
    where: {
      game_id: gameId,
    },
    include: {
      user: {
        include: {
          games: false,
        },
      },
    },
    orderBy: {
      points: "desc",
    },
  });
  console.log();
  return players.map((e) => ({
    points: e.points,
    user: e.user,
    won: e.has_won,
  }));
}

export async function create(
  socket_id: string,
  category_id: number,
  user_id: number
) {
  const game = await prisma.games.create({
    data: {
      socket_id,
      created_by: user_id,
      game_users: {
        create: {
          user_id,
        },
      },
      categories: {
        create: {
          category_id,
        },
      },
    },
  });
  return game;
}
export async function assignToGame(gameId: number, userId: number) {
  const game = await prisma.games.findUnique({
    where: {
      id: gameId,
    },
  });

  if (!game) {
    throw new Error(`Game with ID ${gameId} not found.`);
  }

  const assignedUser = await prisma.games_by_user.create({
    data: {
      game_id: gameId,
      user_id: userId,
    },
    include: {
      user: true,
      game: true,
    },
  });

  return assignedUser;
}

export async function update(id: number, status: GameStatus) {
  return await prisma.games.update({
    where: { id },
    data: {
      game_status: {
        set: status,
      },
    },
  });
}

export async function deleteGame(id: number) {
  const existingGame = await prisma.games.findUnique({
    where: { id },
  });
  if (!existingGame) {
    return null;
  }

  return await prisma.games.delete({
    where: { id },
  });
}
export async function getGameHistory(gameId: number) {
  const gameHistory = await prisma.user_answers.findMany({
    where: {
      game: {
        id: gameId,
      },
    },
    distinct: ["question"],

    select: {
      question: true,
      answer: true,
      is_correct: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return gameHistory;
}
export async function getWaitingGames() {
  const games = await prisma.games.findMany({
    where: { game_status: GameStatus.Waiting },
    include: {
      game_users: {
        include: {
          user: true,
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  });
  const waitingGamesWithPlayerCount = games.map((game) => ({
    id: game.id,
    category: game.categories.map((e) => e.category?.name)[0],
    playerCount: game.game_users.map((e) => e.user).length,
  }));

  return waitingGamesWithPlayerCount;
}
export async function updateScore(
  gameId: number,
  userId: number,
  isCorrect: boolean
): Promise<void> {
  if (isCorrect) {
    try {
      const gameByUser = await prisma.games_by_user.findFirst({
        where: {
          game_id: gameId,
          user_id: userId,
        },
        select: {
          id: true,
        },
      });

      if (gameByUser?.id)
        await prisma.games_by_user.update({
          where: {
            id: gameByUser.id,
          },
          data: {
            points: {
              increment: 1,
            },
          },
        });
    } catch (error) {
      console.error(`Failed to update score: ${error}`);
      throw new Error("Failed to update score");
    }
  }
}
export async function findCategoryIdByGame(gameId: number) {
  const game = await findById(gameId);
  const categoryId = game?.categories
    .map((e) => e.category?.id)
    .find((id) => id !== undefined);
  return categoryId;
}

export async function findGameDataByUserId(userId: number) {
  const game = await prisma.games.findFirst({
    where: {
      game_status: GameStatus.Active,
      game_users: {
        some: {
          user_id: userId,
        },
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  const gameData = {
    gameId: game?.id,
    socketId: game?.socket_id,
    categoryId: game?.categories.map((e) => e.category_id)[0],
  };
  return gameData;
}

export enum GameStatus {
  Active = "ACTIVE",
  Waiting = "WAITING",
  Finished = "FINISHED",
}
