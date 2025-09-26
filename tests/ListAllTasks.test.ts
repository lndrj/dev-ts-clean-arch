import { InMemoryTaskRepository } from "../src/infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../src/core/usecases/CreateTask";
import { ListAllTasks } from "../src/core/usecases/ListAllTasks";

test("list all tasks", async () => {
  const repo = new InMemoryTaskRepository();
  const createTask = new CreateTask(repo);
  await createTask.execute("1", "First Sample Task");
  await createTask.execute("2", "Second Sample Task");
  await createTask.execute("3", "Third Sample Task");

  const listAllTasks = new ListAllTasks(repo);
  const tasks = await listAllTasks.execute();
  expect(tasks.length).toBe(3);
  expect(tasks[0].title).toBe("First Sample Task");
  expect(tasks[1].title).toBe("Second Sample Task");
  expect(tasks[2].title).toBe("Third Sample Task");
});

test("throws when no tasks", async () => {
  const repo = new InMemoryTaskRepository();
  const listAllTasks = new ListAllTasks(repo);
  await expect(listAllTasks.execute()).rejects.toThrow("No tasks found");
});
