import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 15 }).notNull().unique(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  password: varchar("password", { length: 150 }).notNull(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
