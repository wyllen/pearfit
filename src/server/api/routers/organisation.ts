import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const organisationRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        contactEmail: z.string().nullable(),
        address: z.string().nullable(),
        postalCode: z.number().nullable(),
        city: z.string().nullable(),
        country: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const organisation = await prisma?.organisation.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          contactEmail: input.contactEmail,
          address: input.address,
          postalCode: +(input.postalCode || ''),
          city: input.city,
          country: input.country,
        },
      });
      return organisation;
    }),
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
