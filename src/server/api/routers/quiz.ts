import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const quizRouter = createTRPCRouter({
  updateAnswer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().nullable(),
        order: z.number().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const answer = await prisma?.answer.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          order: input.order,
        },
      });
      return answer;
    }),
  removeQuestion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const questionDeleted = await prisma?.question.delete({
        where: {
          id: input.id,
        },
      });
      return questionDeleted;
    }),
  addQuestion: protectedProcedure
    .input(
      z.object({ title: z.string(), order: z.number(), quizId: z.string() })
    )
    .mutation(async ({ input }) => {
      const question = await prisma?.question.create({
        data: input,
      });

      return question;
    }),
  updateQuestion: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().nullable(),
        order: z.number().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const answer = await prisma?.question.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          order: input.order,
        },
      });
      return answer;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        roleId: z.string().nullable(),
        question: z
          .array(
            z.object({
              id: z.string(),
              title: z.string().nullable(),
              order: z.number().nullable(),
              // answers: z
              //   .array(
              //     z.object({
              //       id: z.string(),
              //       title: z.string().nullable(),
              //       order: z.number().nullable(),
              //       goodAnswer: z.boolean().nullable(),
              //       questionId: z.string().nullable(),
              //     })
              //   )
              //   .nullable(),
            })
          )
          .nullable(),
      })
    )
    .mutation(async ({ input }) => {
      const quiz = await prisma?.quiz.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          roleId: input.roleId,
          question: {
            updateMany: input.question?.map((question) => ({
              where: {
                id: question.id,
              },
              data: {
                title: question.title,
                order: question.order,
                // answers: {
                //   updateMany: question.answers?.map((answer) => ({
                //     where: {
                //       id: answer.id,
                //     },
                //     data: {
                //       title: answer.title,
                //       order: answer.order,
                //       goodAnswer: answer.goodAnswer,
                //     },
                //   })),
                // },
              },
            })),
          },
        },
      });

      return quiz;
    }),
});
