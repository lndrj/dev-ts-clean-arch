import { Task } from "../entities/Task";
import { TaskRepository } from "../../application/TaskRepository";

export class UpdateTaskTitle {
  constructor(private repo: TaskRepository) {}

  async execute(id: string, title: string): Promise<Task> {
    if (!title.trim()) throw new Error("Title cannot be empty");
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    task.title = title;
    await this.repo.save(task);
    return task;
  }
}
