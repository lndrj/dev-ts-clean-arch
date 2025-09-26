import { InMemoryTaskRepository } from "../infrastructure/InMemoryTaskRepository";
import { CreateTask } from "../core/usecases/CreateTask";
import { UpdateTaskTitle } from "../core/usecases/UpdateTaskTitle";
import { ToggleTaskCompletion } from "../core/usecases/ToggleTaskCompletion";
import { ListAllTasks } from "../core/usecases/ListAllTasks";
import { DeleteTask } from "../core/usecases/DeleteTask";

async function main() {
  const repo = new InMemoryTaskRepository();
  const createTask = new CreateTask(repo);
  const task = await createTask.execute("1", "Sample Task");
  console.log("New Task: ", task);

  //Create second task
  await createTask.execute("2", "Second Sample Task");
  const updateTaskTitle = new UpdateTaskTitle(repo);
  const updatedTask = await updateTaskTitle.execute("2", "Updated Task Title");
  console.log("Updated task title ", updatedTask);

  const toggleTaskCompletion = new ToggleTaskCompletion(repo);
  const isCompleted = await toggleTaskCompletion.execute("1");
  console.log(`Task id: 1 - completed: ${isCompleted}`);
  const isCompletedSecond = await toggleTaskCompletion.execute("1");
  console.log(`Task id: 1 - completed: ${isCompletedSecond}`);

  await createTask.execute("3", "Third Sample Task");
  await toggleTaskCompletion.execute("3");
  const listAllTasks = new ListAllTasks(repo);
  const tasks = await listAllTasks.execute();
  console.log(tasks);

  const deleteTask = new DeleteTask(repo);
  await deleteTask.execute("2");
  const tasksAfterDeletion = await listAllTasks.execute();
  console.log(tasksAfterDeletion);
}

main();
