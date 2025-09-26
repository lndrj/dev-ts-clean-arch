import { InMemoryTaskRepository } from "../src/infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../src/core/usecases/CreateTask";
import { ListAllTasks } from "../src/core/usecases/ListAllTasks";
import { DeleteTask } from "../src/core/usecases/DeleteTask";

test("deletes a task", async () => {
  const repo = new InMemoryTaskRepository();
  const createTask = new CreateTask(repo);
  await createTask.execute("1", "Task to be deleted");
  const deleteTask = new DeleteTask(repo);
  await deleteTask.execute("1");
  const listAllTasks = new ListAllTasks(repo);
  const tasks = await listAllTasks.execute();
  expect(tasks).toEqual([]);
});

test("throws on empty id", async () => {
  const repo = new InMemoryTaskRepository();
  const deleteTask = new DeleteTask(repo);
  await expect(deleteTask.execute("   ")).rejects.toThrow("ID cannot be empty");
});

test("throws on non-existing task", async () => {
  const repo = new InMemoryTaskRepository();
  const deleteTask = new DeleteTask(repo);
  await expect(deleteTask.execute("fakeId")).rejects.toThrow("Task not found");
});
