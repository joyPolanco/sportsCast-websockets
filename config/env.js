import { config } from "dotenv";

config({ path:`.env.${process.NODE_ENV || "development"}.local`});
export const
 {
 PORT
 } = process.env;
