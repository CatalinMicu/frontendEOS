import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusService, StatusType } from '../../services/status-service';
import { SearchParams, Task, TaskService } from '../../services/task-service';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search implements OnInit {
  private taskService = inject(TaskService);
  private statusService = inject(StatusService);

  tasks: Task[] = [];
  statuses: StatusType[] = [];
  searched = false;
  loading = false;

  useAssignedTo = false;
  useSubject = false;
  useDueDate = false;
  useStatus = false;

  assignedTo = '';
  subject = '';
  dueDate = '';
  status = '';

  ngOnInit(): void {
    this.statusService.getStatuses().subscribe((res) => {
      this.statuses = res;
    });
  }

  search(): void {
    const params: SearchParams = {};
    if (this.useAssignedTo && this.assignedTo) params.assignedTo = this.assignedTo;
    if (this.useSubject && this.subject) params.subject = this.subject;
    if (this.useDueDate && this.dueDate) params.dueDate = this.dueDate;
    if (this.useStatus && this.status) params.status = this.status;
    this.loading = true;

    this.taskService.searchTasks(params).subscribe({
      next: (res) => {
        this.tasks = res;
        this.searched = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  clear(): void {
    this.useAssignedTo = false;
    this.useSubject = false;
    this.useDueDate = false;
    this.useStatus = false;
    this.assignedTo = '';
    this.subject = '';
    this.dueDate = '';
    this.status = '';
    this.tasks = [];
    this.searched = false;
    this.loading = false;
  }
}
