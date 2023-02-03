import { exampleRouter } from './routers/example';
import { meRouter } from './routers/me';
import { organisationRouter } from './routers/organisation';
import { quizRouter } from './routers/quiz';
import { roleRouter } from './routers/role';
import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  me: meRouter,
  organisation: organisationRouter,
  role: roleRouter,
  quiz: quizRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
