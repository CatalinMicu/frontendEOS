import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StatusType, Task, TaskData, Tasks } from '../../services/tasks';
import { NewTask } from '../new-task/new-task';

@Component({
  selector: 'app-my-tasks',
  imports: [NewTask],
  templateUrl: './my-tasks.html',
  styleUrl: './my-tasks.css',
})
export class MyTasks implements OnInit {
  private tasksService = inject(Tasks);
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
    const request = this.selectedTask
      ? this.tasksService.updateTask(this.selectedTask.taskId, taskData)
      : this.tasksService.createTask(taskData);

    request.subscribe(() => {
      this.closeModal();
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.tasksService.getTasks().subscribe((res) => {
      this.tasks = res.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
      this.changeDetectorRef.detectChanges();
    });
  }

  private loadStatuses(): void {
    this.tasksService.getStatuses().subscribe((res) => {
      this.statuses = res;
      this.changeDetectorRef.detectChanges();
    });
  }
}
