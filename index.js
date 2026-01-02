// ESM style
import express from "express";
import { create, router, defaults } from "json-server";
import auth from "json-server-auth";

const app = express();
const dbRouter = router("data/db.json");
const middlewares = defaults();

app.use(middlewares);
app.use(auth);
app.use(dbRouter);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
