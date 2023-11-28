import express from "express";
import cors from "cors";
import route from "./routes/router.js";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.json());

// load routes
app.use("/", route);

app.use(express.static(path.join(__dirname, "frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(port, () => {
  // console.log(path.join(__dirname, "public/index.html"));
  console.log(`Server listening on port ${port}!`);
});
