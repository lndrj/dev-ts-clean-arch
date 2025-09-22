import { InMemoryTaskRepository } from '../infrastructure/InMemoryTaskRepository';
import { CreateTask } from '../core/usecases/CreateTask';

async function main() {
  const repo = new InMemoryTaskRepository();
  const createTask = new CreateTask(repo);
  const task = await createTask.execute('1', 'Sample Task');
  console.log(task);
}

main();
