import {defineConfig} from "drizzle-kit"

import { DATABASE_URL } from "./config/env.js"

export default defineConfig({
    schema:"./src/db/schema.js",
    out: "./drizzle",
    dialect:"postgresql",
    dbCredentials:{
        url:DATABASE_URL
    }

})
