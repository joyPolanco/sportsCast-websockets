import 'dotenv/config'
import {drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import{ DATABASE_URL} from '../../config/env.js'

if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL is not defined')

}
export const pool= new pg.Pool ({
    connectionString: process.env.DATABASE_URL
})

export const db= drizzle(pool)