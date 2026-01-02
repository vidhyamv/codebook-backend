import express from "express";
import pkg from "json-server";
import auth from "json-server-auth";

const { create, router, defaults } = pkg;

const app = create();
const dbRouter = router("data/db.json");
const middlewares = defaults();

app.db = dbRouter.db;

app.use(middlewares);
app.use(auth);
app.use(dbRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
