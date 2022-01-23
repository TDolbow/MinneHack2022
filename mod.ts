import { Application, HttpError, send } from "https://deno.land/x/oak/mod.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";
import {
    bold,
    red,
    yellow,
    green,
    blue
} from "https://deno.land/std@0.116.0/fmt/colors.ts";

// Load DB credentials and connect to database
const dbCreds = JSON.parse(await Deno.readTextFile('db-creds.json'));

// Connect to SQL server
const client = await new Client().connect({
  hostname: dbCreds.host,
  username: dbCreds.username,
  db: dbCreds.db,
  password: dbCreds.password,
});

const app = new Application();

app.addEventListened("listen", ({ hostname, port }) => {
    console.log(bold(`Server listening on http://${hostname}:${port}. `));
});

await app.listen({ hostname: "localhost", port: 8000 });