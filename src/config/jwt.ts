import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

export const validateJWT = async (token: string) => {
  try {
    const content = jwt.verify(token, JWT_PRIVATE_KEY);
    return content || null;
  } catch (e) {
    throw new createHttpError.Unauthorized("Please provide a valid token");
  }
};

export const generateUserToken = async (data: object) =>
  jwt.sign(data, JWT_PRIVATE_KEY, {
    expiresIn: "365d",
  });
