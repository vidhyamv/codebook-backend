import express from "express";
import pkg from "json-server";
const { create, router, defaults } = pkg;
import auth from "json-server-auth";

const app = create(); // use json-server create
const dbRouter = router("data/db.json");
const middlewares = defaults();

app.db = dbRouter.db;

app.use(middlewares);
app.use(auth);
app.use(dbRouter);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
