import knex from "../helpers/knex";
import { RequestBody } from "../types/index";
import { shorten_validation, shorten_update_validation } from "./validations";
import createHttpError from "http-errors";

export const shorten = async (body: RequestBody, user_id: string) => {
  const validated = shorten_validation(body);
  if (validated.id) {
    // Check if name is unique
    const name_exists = await knex("urls")
      .where({ id: validated.id })
      .count()
      .first();
    if (name_exists && name_exists.count !== "0") {
      throw new createHttpError.Conflict("Name already exists");
    }
  }
  return (await knex("urls").insert({ ...validated, user_id }, "*"))[0];
};

export const resolve_url = async (id: string, ip: string) => {
  const url = await knex("urls").where({ id }).select(["id", "url"]).first();
  if (!url) {
    throw new createHttpError.NotFound("URL not found");
  }
  await knex("visits").insert({ url_id: url.id, ip });
  return url.url;
};

export const get_urls = async (user_id: string) => {
  return knex("urls")
    .where({ user_id })
    .leftJoin("visits", "urls.id", "visits.url_id")
    .select([
      "urls.id",
      "urls.url",
      "urls.created_at",
      knex.raw("count(visits.id) as visits"),
    ])
    .groupBy("urls.id");
};

export const update_url = async (id: string, user_id: string, body: any) => {
  const validated = shorten_update_validation(body);
  const url = await knex("urls").where({ id }).first();
  if (!url) {
    throw new createHttpError.NotFound("URL not found");
  }
  if (url.user_id !== user_id) {
    throw new createHttpError.Unauthorized(
      "You don't have permissions to edit this URL"
    );
  }
  return (await knex("urls").where({ id }).update(validated, "*"))[0];
};

export const delete_url = async (id: string, user_id: string) => {
  // Check if the URL belongs to the user
  const url = await knex("urls").where({ id }).first();
  if (!url) {
    throw new createHttpError.NotFound("URL not found");
  }
  if (url.user_id !== user_id) {
    throw new createHttpError.Unauthorized(
      "You don't have permissions to edit this URL"
    );
  }
  await knex("urls").where({ id }).delete();
  return true;
};
