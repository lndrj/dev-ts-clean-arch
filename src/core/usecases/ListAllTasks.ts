import { TaskRepository } from "../../application/TaskRepository";
import { Task } from "../entities/Task";

export class ListAllTasks {
  constructor(private repo: TaskRepository) {}

  async execute(): Promise<Task[]> {
    const tasks = await this.repo.findAll();
    if (tasks.length === 0) return [];
    return tasks;
  }
}
