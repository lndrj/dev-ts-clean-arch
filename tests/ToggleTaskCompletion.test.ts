import { InMemoryTaskRepository } from "../src/infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../src/core/usecases/CreateTask";
import { ToggleTaskCompletion } from "../src/core/usecases/ToggleTaskCompletion";

test("toggles task completion", async () => {
  const repo = new InMemoryTaskRepository();
  const usecaseCreate = new CreateTask(repo);
  const task = await usecaseCreate.execute("1", "Sample Task");

  const usecaseToggle = new ToggleTaskCompletion(repo);
  const isCompleted = await usecaseToggle.execute("1");
  expect(isCompleted).toBe(true);

  const isCompletedAgain = await usecaseToggle.execute("1");
  expect(isCompletedAgain).toBe(false);
});

test("throws error if task not found", async () => {
  const repo = new InMemoryTaskRepository();
  const usecaseToggle = new ToggleTaskCompletion(repo);
  await expect(usecaseToggle.execute("")).rejects.toThrow("Task not found");
});
