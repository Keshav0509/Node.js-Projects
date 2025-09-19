import {
  pgTable,
  varchar,
  text,
  uuid,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("role_enum", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  firstname: varchar("first_name", { length: 100 }).notNull(),
  lastname: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
  role: userRoleEnum("role_enum").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
