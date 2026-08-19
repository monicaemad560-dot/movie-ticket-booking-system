import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role: string): string => {
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

    return jwt.sign({ id: userId, role }, secret, { expiresIn } as jwt.SignOptions);
};