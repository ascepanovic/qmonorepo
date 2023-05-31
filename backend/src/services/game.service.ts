import { prisma } from "../utils/prisma";

export async function findAll() {
  return await prisma.games.findMany({
    include: {
      game_users: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function findById(id: number) {
  return await prisma.games.findUnique({
    where: { id },
    include: {
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

export async function update(id: number, created_by: number) {
  return await prisma.games.update({
    where: { id },
    data: {
      created_by,
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
