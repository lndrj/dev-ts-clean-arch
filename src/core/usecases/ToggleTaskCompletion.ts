import { TaskRepository } from "../../application/TaskRepository";

export class ToggleTaskCompletion {
  constructor(private repo: TaskRepository) {}

  async execute(id: string): Promise<boolean> {
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    task.completed = !task.completed;
    await this.repo.save(task);
    return task.completed;
  }
}
