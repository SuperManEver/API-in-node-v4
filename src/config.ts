export const JWT_SECRET: string = process.env.JWT_SECRET;
export const PORT: string = process.env.PORT;
export const ENCRYPTION_SALT: number = parseInt(
  process.env.ENCRYPTION_SALT,
  10
);
