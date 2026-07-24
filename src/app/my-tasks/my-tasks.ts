import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StatusService, StatusType } from '../../services/status-service';
import { Task, TaskData, TaskService } from '../../services/task-service';
import { NewTask } from '../new-task/new-task';

@Component({
  selector: 'app-my-tasks',
  imports: [NewTask],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private taskService = inject(TaskService);
  private statusService = inject(StatusService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  tasks: Task[] = [];
  statuses: StatusType[] = [];
  selectedTask: Task | null = null;
  isModalOpen = false;

  ngOnInit(): void {
    this.loadTasks();
    this.loadStatuses();
  }

  openNewTask(): void {
    this.selectedTask = null;
    this.isModalOpen = true;
  }

  openEditTask(task: Task): void {
    this.selectedTask = task;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedTask = null;
  }

  saveTask(taskData: TaskData): void {
    if (this.selectedTask) {
      this.taskService
        .updateTask(this.selectedTask.taskId, taskData)
        .subscribe(() => {
          this.closeModal();
          this.loadTasks();
        });
      return;
    }

    this.taskService.createTask(taskData).subscribe(() => {
      this.closeModal();
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.tasks = res.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
      this.changeDetectorRef.detectChanges();
    });
  }

  private loadStatuses(): void {
    this.statusService.getStatuses().subscribe((res) => {
      this.statuses = res;
      this.changeDetectorRef.detectChanges();
    });
  }
}
