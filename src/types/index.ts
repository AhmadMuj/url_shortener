export type RequestBody = { [key: string]: any };

export interface User {
  id: string;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Url {
  id: string;
  url: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Visit {
  id: string;
  url_id: string;
  ip: string;
  created_at: Date;
  updated_at: Date;
}

declare module "knex/types/tables" {
  interface Tables {
    users: User;
    urls: Url;
    visits: Visit;
  }
}
