import bcryptjs from "bcryptjs";

const SALT = Number(process.env.PASSWORD_SLAT);

export const hashPassword = async (password: string) =>
  bcryptjs.hash(password, SALT);

export const comparePassword = async (password: string, hash: string) =>
  bcryptjs.compare(password, hash);
