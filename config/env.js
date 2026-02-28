import { config } from "dotenv";

config({ path:`.env.${process.NODE_ENV || "development"}.local`});
export const
 {
 PORT,
 HOST,
 DATABASE_URL
 } = process.env;
