import { InMemoryTaskRepository } from "../src/infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../src/core/usecases/CreateTask";
import { UpdateTaskTitle } from "../src/core/usecases/UpdateTaskTitle";

test("updates a task with valid title", async () => {
  const repo = new InMemoryTaskRepository();
  const usecaseCreate = new CreateTask(repo);
  await usecaseCreate.execute("1", "Test Title");
  const useCaseUpdate = new UpdateTaskTitle(repo);
  const task = await useCaseUpdate.execute(
    "1",
    "This test task has been updated :-)"
  );
  expect(task.title).toBe("This test task has been updated :-)");
  expect(task.completed).toBe(false);
});

test("throws on empty title", async () => {
  const repo = new InMemoryTaskRepository();
  const usecaseUpdate = new UpdateTaskTitle(repo);
  const task = usecaseUpdate.execute("1", "   ");
  await expect(task).rejects.toThrow();
});

test("throws on non-existing task", async () => {
  const repo = new InMemoryTaskRepository();
  const useCaseUpdate = new UpdateTaskTitle(repo);
  const task = useCaseUpdate.execute(" ", "This task does not exist");
  await expect(task).rejects.toThrow("Task not found");
});
