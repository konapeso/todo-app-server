import express from "express";
import { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const POST = 8080;

app.use(express.json());

const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodo);
  } catch (error) {
    return res.status(400).json({ error: "Todo not found" });
  }
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(editTodo);
  } catch (error) {
    return res.status(400).json({ error: "Todo not found" });
  }
});

app.listen(POST, () => console.log(`Server is running on port ${POST}🚀`));
