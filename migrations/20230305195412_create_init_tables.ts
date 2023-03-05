import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .raw(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    .createTable("users", (table) => {
      table.string("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("username").unique();
      table.text("password").notNullable();
      table.timestamps(true, true);
    })
    .createTable("urls", (table) => {
      table.string("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("url").notNullable();
      table
        .string("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("visits", (table) => {
      table.string("id").defaultTo(knex.raw("uuid_generate_v4()")).primary();
      table.string("url_id").notNullable();
      table.string("ip").notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("visits").dropTable("urls").dropTable("users");
}
