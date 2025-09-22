import { InMemoryTaskRepository } from '../src/infrastructure/InMemoryTaskRepository';
import { CreateTask } from '../src/core/usecases/CreateTask';

test('creates a task with valid title', async () => {
  const repo = new InMemoryTaskRepository();
  const usecase = new CreateTask(repo);
  const task = await usecase.execute('1', 'Test Task');
  expect(task.title).toBe('Test Task');
  expect(task.completed).toBe(false);
});

test('throws on empty title', async () => {
  const repo = new InMemoryTaskRepository();
  const usecase = new CreateTask(repo);
  await expect(usecase.execute('1', '   ')).rejects.toThrow();
});
