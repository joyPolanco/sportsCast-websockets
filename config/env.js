import { config } from "dotenv";

config({ path:`.env.${process.NODE_ENV || "development"}.local`});
export const
 {
 PORT,
 DATABASE_URL
 } = process.env;
