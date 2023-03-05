import knex from "../helpers/knex";
import createHttpError from "http-errors";

export const get_last_visits = async (
  user_id: string,
  limit: number,
  offset: number
) => {
  return knex("visits")
    .join("urls", "urls.id", "visits.url_id")
    .select("urls.id", "urls.url", "visits.ip", "visits.created_at")
    .where({ user_id })
    .limit(limit || 15)
    .offset(offset || 0);
};

export const get_visit_stats_by_url = async (
  id: string,
  user_id: string,
  limit: number,
  offset: number
) => {
  const url = await knex("urls").where({ id }).select(["user_id"]).first();
  if (!url) {
    throw new createHttpError.NotFound("URL not found");
  }
  if (url.user_id !== user_id) {
    throw new createHttpError.Unauthorized(
      "You don't have permissions to view this URL"
    );
  }
  const visits = await knex("visits")
    .where({ url_id: id })
    .select(["ip", "created_at"])
    .limit(limit || 15)
    .offset(offset || 0);

  return visits;
};
