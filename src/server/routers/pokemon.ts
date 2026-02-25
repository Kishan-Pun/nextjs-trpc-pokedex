import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { db } from "../db";

export const pokemonRouter = router({
  getPokemon: publicProcedure.input(z.string()).query(async ({ input }) => {
    return db.pokemon.findFirst({
      where: {
        name: {
          equals: input,
          mode: "insensitive",
        },
      },
    });
  }),

  getPokemonList: publicProcedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
      return db.pokemon.findMany({
        where: {
          OR: input.map((name) => ({
            name: {
              equals: name,
              mode: "insensitive",
            },
          })),
        },
      });
    }),

  getPokemonByType: publicProcedure
    .input(
      z.object({
        types: z.array(z.string()),
        page: z.number(),
        limit: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { types, page, limit } = input;

      const where =
        types.length > 0
          ? {
              OR: types.map((type) => ({
                types: {
                  has: type,
                },
              })),
            }
          : {};

      const total = await db.pokemon.count({ where });

      const pokemon = await db.pokemon.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          id: "asc",
        },
      });

      return {
        pokemon,
        total,
      };
    }),

  getAllTypes: publicProcedure.query(async () => {
    const result = await db.pokemon.findMany({
      select: {
        types: true,
      },
    });

    const uniqueTypes = new Set<string>();

    result.forEach((pokemon) => {
      pokemon.types.forEach((type) => {
        uniqueTypes.add(type);
      });
    });

    return Array.from(uniqueTypes).sort();
  }),
});
