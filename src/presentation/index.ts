import { InMemoryTaskRepository } from "../infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../core/usecases/CreateTask";
import { UpdateTaskTitle } from "../core/usecases/UpdateTaskTitle";
import { ToggleTaskCompletion } from "../core/usecases/ToggleTaskCompletion";

async function main() {
  const repo = new InMemoryTaskRepository();
  const createTask = new CreateTask(repo);
  const task = await createTask.execute("1", "Sample Task");
  console.log(task);

  const updateTaskTitle = new UpdateTaskTitle(repo);
  const updatedTask = await updateTaskTitle.execute("1", "Updated Task Title");
  console.log(updatedTask);

  const toggleTaskCompletion = new ToggleTaskCompletion(repo);
  const isCompleted = await toggleTaskCompletion.execute("1");
  console.log(`Task id: 1 - completed: ${isCompleted}`);
  const isCompletedSecond = await toggleTaskCompletion.execute("1");
  console.log(`Task id: 1 - completed: ${isCompletedSecond}`);
}

main();
