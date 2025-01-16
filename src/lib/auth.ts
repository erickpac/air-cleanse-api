import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/lib/config";

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param password - The plain text password to hash.
 * @param rounds - The number of salt rounds to use (default is 10).
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (
  password: string,
  rounds: number = 10,
): Promise<string> => {
  const salt = await bcrypt.genSalt(rounds);
  return bcrypt.hash(password, salt);
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param password - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating if the passwords match.
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Generates a JSON Web Token (JWT) for a given user.
 *
 * @param userId - The unique identifier of the user.
 * @param userEmail - The email address of the user.
 * @returns A signed JWT as a string.
 *
 * @throws Will throw an error if the JWT_SECRET is not defined.
 *
 * @example
 * ```typescript
 * const token = generateToken(123, 'user@example.com');
 * console.log(token); // Outputs the generated JWT
 * ```
 */
export const generateToken = (userId: number, userEmail: string): string => {
  return jwt.sign({ id: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

/**
 * Verifies the provided JWT token using the secret key.
 *
 * @param token - The JWT token to be verified.
 * @returns The decoded token if verification is successful.
 * @throws {JsonWebTokenError} If the token is invalid or verification fails.
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
