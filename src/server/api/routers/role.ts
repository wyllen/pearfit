import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const roleRouter = createTRPCRouter({
  updateRoleLevel: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        level: z.number().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const roleLevel = await prisma?.roleLevel.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          level: input.level,
        },
      });
      console.log('input', input);
      console.log('roleLevel', roleLevel);
      return roleLevel;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        organisationId: z.string().nullable(),
        roleLevel: z
          .array(
            z.object({
              id: z.string(),
              name: z.string().nullable(),
              level: z.number().nullable(),
              roleId: z.string().nullable(),
            })
          )
          .nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const role = await prisma?.role.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          roleLevel: {
            updateMany: input.roleLevel?.map((roleLevel) => ({
              where: {
                id: roleLevel.id,
              },
              data: {
                name: roleLevel.name,
                level: roleLevel.level,
              },
            })),
          },
        },
      });
    }),
});
