import { db } from '../db';
import { InsertUser, usersTable } from '../schema';

export async function createUser(data: InsertUser, db) {
  await db.insert(usersTable).values(data);
}

