import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Task {
  taskId: number;
  name: string;
  dueDate: string;
  statusName: string;
  userId: number;
  assignedTo: string;
  createdBy: string;
}

export interface SearchParams {
  assignedTo?: string;
  subject?: string;
  dueDate?: string;
  status?: string;
}

export interface TaskData {
  taskId: number | null;
  name: string;
  dueDate: string;
  statusName: string;
  userId: number;
  createdBy: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  getTasks() {
    return this.http.get<Task[]>('http://localhost:8080/tasks');
  }

  createTask(task: TaskData) {
    return this.http.post<Task>('http://localhost:8080/tasks', {
      name: task.name,
      dueDate: task.dueDate,
      statusName: task.statusName,
      userId: task.userId,
      createdBy: task.createdBy,
    });
  }

  updateTask(taskId: number, task: TaskData) {
    return this.http.put<Task>(`http://localhost:8080/tasks/${taskId}`, {
      name: task.name,
      dueDate: task.dueDate,
      statusName: task.statusName,
      userId: task.userId,
      createdBy: task.createdBy,
    });
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(
      `http://localhost:8080/tasks/${taskId}`,
    );
  }

  searchTasks(params: SearchParams) {
    let httpParams = new HttpParams();

    if (params.assignedTo) {
      httpParams = httpParams.set('assignedTo', params.assignedTo);
    }
    if (params.subject) {
      httpParams = httpParams.set('subject', params.subject);
    }
    if (params.dueDate) {
      httpParams = httpParams.set('dueDate', params.dueDate);
    }
    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }

    return this.http.get<Task[]>('http://localhost:8080/tasks/search', {
      params: httpParams,
    });
  }
}
