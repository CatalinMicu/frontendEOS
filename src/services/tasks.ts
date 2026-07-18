import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Task {
  taskId: number;
  name: string;
  dueDate: string;
  statusName: string;
  userId: number;
  createdBy: string;
}

export interface StatusType {
  statusTypeId: string;
  statusName: string;
}

export interface SearchParams {
  assignedTo?: string;
  subject?: string;
  dueDate?: string;
  status?: string;
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

  getStatuses() {
    return this.http.get<StatusType[]>('http://localhost:8080/statuses');
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
