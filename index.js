import express from "express";
import pkg from "json-server";
const { create, router, defaults } = pkg;
import auth from "json-server-auth";

const app = create(); // json-server instance

const dbRouter = router("data/db.json");
app.db = dbRouter.db;

app.use(defaults());
app.use(auth);
app.use(dbRouter);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
