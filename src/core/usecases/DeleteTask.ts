import { TaskRepository } from "../../application/TaskRepository";

export class DeleteTask {
  constructor(private repo: TaskRepository) {}

  async execute(id: string): Promise<void> {
    if (!id.trim()) throw new Error("ID cannot be empty");
    const task = await this.repo.findById(id);
    if (!task) throw new Error("Task not found");
    await this.repo.delete(id);
    // console.log(`Task with id: ${id} deleted`);
  }
}
