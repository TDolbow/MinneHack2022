import { Application } from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";

// Load DB credentials and connect to database
const dbCreds = JSON.parse(await Deno.readTextFile('db-creds.json'));

// Connect to SQL server
const client = await new Client().connect({
  hostname: dbCreds.host,
  username: dbCreds.username,
  db: dbCreds.db,
  password: dbCreds.password,
});

console.log(dbCreds);