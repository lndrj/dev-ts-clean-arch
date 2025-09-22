import { Task } from '../entities/Task';
import { TaskRepository } from '../../application/TaskRepository';

export class CreateTask {
  constructor(private repo: TaskRepository) {}

  async execute(id: string, title: string): Promise<Task> {
    if (!title.trim()) throw new Error('Title cannot be empty');
    const task = new Task(id, title);
    await this.repo.save(task);
    return task;
  }
}
