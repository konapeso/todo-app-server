import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const POST = 8080;

app.get("/allTodos", (req: Request, res: Response) => {
  return res.send("Todos");
});

app.listen(POST, () => console.log(`Server is running on port ${POST}`));
