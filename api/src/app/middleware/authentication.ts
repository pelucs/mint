import jwt from "jsonwebtoken";

import { UserJwtInvalidError } from "../exceptions/user-jwt-invalid-error";
import { NextFunction, Request, Response } from "express";

const SECRET_KEY = process.env.JWT_SECRET || "9f8e7d6c5b4a3928";

export async function validateJWT(request: Request, response: Response, next: NextFunction) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return response.status(401).json({ message: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err) => {
      if(err) {
        throw new UserJwtInvalidError()
      }

      next();
    });
  } catch (error) {
    return response.status(401).json({ message: "Token inválido ou expirado" });
  }
}
