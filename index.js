import express from "express";
import jwt from "jsonwebtoken";
import { create, router, defaults } from "json-server";

const app = create();
const dbRouter = router("data/db.json");

app.use(defaults());
app.use(express.json());

const SECRET = "mysecret";

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = dbRouter.db
    .get("users")
    .find({ email, password })
    .value();

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token });
});

// protect rou
