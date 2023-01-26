import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const organisationRouter = createTRPCRouter({
  roles: protectedProcedure
    .input(z.object({ organisationId: z.string() }))
    .query(async ({ input }) => {
      const roles = await prisma?.role.findMany({
        where: {
          organisationId: input.organisationId,
        },
        include: {
          roleLevel: true,
        },
      });

      return roles;
    }),
  quizzes: protectedProcedure
    .input(z.object({ organisationId: z.string() }))
    .query(async ({ input }) => {
      const quizzes = await prisma?.quiz.findMany({
        where: {
          organisationId: input.organisationId,
        },
        include: {
          question: {
            include: {
              answers: true,
            },
          },
        },
      });
      return quizzes;
    }),
  candidates: protectedProcedure
    .input(z.object({ organisationId: z.string() }))
    .query(async ({ input }) => {
      const candidates = await prisma?.candidate.findMany({
        where: {
          organisationId: input.organisationId,
        },
        include: {
          role: true,
        },
      });
      return candidates;
    }),
  users: protectedProcedure
    .input(z.object({ organisationId: z.string() }))
    .query(async ({ input }) => {
      const userOrganisation = await prisma?.userOrganisation.findMany({
        where: {
          organisationId: input.organisationId,
        },
        include: {
          user: true,
        },
      });
      return userOrganisation?.map((uo) => uo.user);
    }),
});
