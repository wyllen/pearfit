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
  removeRoleLevel: protectedProcedure
    .input(
      z.object({
        roleLevelId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const roleLevelDeleted = await prisma?.roleLevel.delete({
        where: {
          id: input.roleLevelId,
        },
      });
      return roleLevelDeleted;
    }),
  addRoleLevel: protectedProcedure
    .input(
      z.object({ name: z.string(), level: z.number(), roleId: z.string() })
    )
    .mutation(async ({ input }) => {
      const roleLevel = await prisma?.roleLevel.create({
        data: input,
      });

      return roleLevel;
    }),
  updateRoleLevelsLevel: protectedProcedure
    .input(
      z.object({
        roleLevels: z.array(
          z.object({
            id: z.string(),
            level: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const roleLevels = await Promise.all(
        input.roleLevels.map((roleLevel) =>
          prisma?.roleLevel.update({
            where: {
              id: roleLevel.id,
            },
            data: {
              level: roleLevel.level,
            },
          })
        )
      );

      return roleLevels;
    }),

  updateRoleLevel: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        level: z.number().optional(),
        roleId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const roleLevel = await prisma?.roleLevel.create({
        data: input,
      });

      return roleLevel;
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
