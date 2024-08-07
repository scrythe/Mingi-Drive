import { db } from "../db";
import { SelectUser, usersTable } from "../schema";
import { eq, } from 'drizzle-orm';

export function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: number;
    username: string;
    password: string;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export function getUsers() { return db.select().from(usersTable) }
