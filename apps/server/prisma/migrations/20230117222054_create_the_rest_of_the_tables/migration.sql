-- CreateTable
CREATE TABLE "habit_week_days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "habit_id" TEXT NOT NULL,
    "week_day" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "days" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME
);

-- CreateTable
CREATE TABLE "day_habits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_id" TEXT NOT NULL,
    "habit_id" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "habit_week_days_habit_id_week_day_idx" ON "habit_week_days"("habit_id", "week_day");

-- CreateIndex
CREATE INDEX "days_date_idx" ON "days"("date");

-- CreateIndex
CREATE INDEX "day_habits_day_id_habit_id_idx" ON "day_habits"("day_id", "habit_id");
