import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Task {
  taskId: number;
  name: string;
  dueDate: string;
  statusTypeId: string;
  userId: number;
  createdBy: string;
}

export type TaskData = Omit<Task, 'taskId'>;

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>('http://localhost:8080/tasks');
  }

  createTask(task: TaskData) {
    return this.http.post<Task>('http://localhost:8080/tasks', task);
  }

  updateTask(taskId: number, task: TaskData) {
    return this.http.put<Task>(
      `http://localhost:8080/tasks/${taskId}`,
      task,
    );
  }
}
