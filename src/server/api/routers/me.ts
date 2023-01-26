import { createTRPCRouter, protectedProcedure } from '../trpc';

export const meRouter = createTRPCRouter({
  organisations: protectedProcedure.query(async ({ ctx }) => {
    const organisations = await prisma?.userOrganisation.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        organisation: true,
      },
    });

    return organisations;
  }),
});
