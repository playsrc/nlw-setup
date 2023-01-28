import { z } from "zod";
import { prisma } from "../lib/prisma";
import dayjs from "dayjs";
import { publicProcedure, router } from "../lib/trpc";

export const habitsRouter = router({
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        weekDays: z.array(z.number().min(0).max(6)),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title, weekDays } = input;

      const today = dayjs().startOf("day").toDate();

      const newHabit = await prisma.habit.create({
        data: {
          title,
          created_at: today,
          weekDays: {
            create: weekDays.map((weekDay) => {
              return {
                week_day: weekDay,
              };
            }),
          },
        },
      });

      ctx.res.status(201);
      return newHabit;
    }),

  day: publicProcedure
    .input(
      z.object({
        date: z.string().datetime(),
      })
    )
    .mutation(async ({ input }) => {
      const { date } = input;

      const parsedDate = dayjs(date).startOf("day");
      const weekDay = parsedDate.get("day");

      const possibleHabits = await prisma.habit.findMany({
        where: {
          created_at: {
            lte: date,
          },
          weekDays: {
            some: {
              week_day: weekDay,
            },
          },
        },
      });

      const day = await prisma.day.findUnique({
        where: {
          date: parsedDate.toDate(),
        },
        include: {
          dayHabits: true,
        },
      });

      const completedHabits =
        day?.dayHabits.map((dayHabit) => {
          return dayHabit.habit_id;
        }) ?? [];

      return {
        possibleHabits,
        completedHabits,
      };
    }),

  toggleById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      console.log(id);

      const today = dayjs().startOf("day").toDate();

      let day = await prisma.day.findUnique({
        where: {
          date: today,
        },
      });

      if (!day) {
        day = await prisma.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await prisma.dayHabit.findUnique({
        where: {
          day_id_habit_id: {
            day_id: day.id,
            habit_id: id,
          },
        },
      });

      if (dayHabit) {
        await prisma.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });
      } else {
        await prisma.dayHabit.create({
          data: {
            day_id: day.id,
            habit_id: id,
          },
        });
      }
    }),

  summary: publicProcedure.query(async () => {
    const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT 
            cast(count(*) as Float)
          FROM day_habits DM
          WHERE DM.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as Float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as Int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return summary;
  }),
});
