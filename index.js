import jsonServer from "json-server";
import jwt from "jsonwebtoken";

const server = jsonServer.create();
const router = jsonServer.router("data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const SECRET = "my-secret-key";

// LOGIN
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// PROTECTED ROUTES
server.use((req, res, next) => {
  if (req.path === "/login") return next();

  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  try {
    jwt.verify(auth.split(" ")[1], SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
});

server.use(router);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});
