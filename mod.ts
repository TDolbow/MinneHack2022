import { Application, Router, HttpError, send } from "https://deno.land/x/oak/mod.ts";
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

const router = new Router();
router
    .get("/api/new-user", async (context) => {
        await client.execute(`INSERT INTO Users() VALUES();`);
        let data = await client.query(`SELECT UUID FROM Users ORDER BY UUID DESC LIMIT 1;`);
        context.response.body = data;
    });
    //.get("/api/site-stats")
    //.post("/api/rating")
    //.post("/api/comment");

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", () => {
    console.log(bold(`Server listening...`));
});

await app.listen({ port: 8000 });
await client.close();