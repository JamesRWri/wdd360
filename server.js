import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World! Welcome to the Express Review server.");
});

app.get("/users", (req, res) => {
  res.json({
    message: "Users route accessed via GET",
    queryParams: req.query
  });
});

app.get("/users/:id", (req, res) => {
  console.log("--- Request Object Exploration ---");
  console.log("HTTP Method:", req.method);
  console.log("Full URL:", req.url);
  console.log("URL Params (req.params):", req.params);
  console.log("URL Query String (req.query):", req.query);
  console.log("Client IP:", req.ip);
  console.log("User-Agent Header:", req.get("user-agent"));
  console.log("Accept Header:", req.get("accept"));

  res.json({
    userId: req.params.id,
    queryData: req.query,
    message: "User details retrieved successfully"
  });
});

app.post("/users", (req, res) => {
  res.status(201).json({
    message: "User created successfully",
    receivedData: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});