import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { StatusService, StatusType } from '../../services/status-service';
import { Task, TaskData, TaskService } from '../../services/task-service';
import { User, UserService } from '../../services/user-service';
import { LoginService } from '../../services/login-service';
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
  private userService = inject(UserService);
  private loginService = inject(LoginService);
  private changeDetectorRef = inject(ChangeDetectorRef);

  allTasks: Task[] = [];
  tasks: Task[] = [];
  statuses: StatusType[] = [];
  users: User[] = [];
  selectedTask: Task | null = null;
  isModalOpen = false;
  showAllTasks = false;

  ngOnInit(): void {
    this.loadTasks();
    this.loadStatuses();
    this.loadUsers();
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

  showMyTasks(): void {
    this.showAllTasks = false;
    this.tasks = this.allTasks.filter(
      (task) => task.userId === this.loginService.currentUser()?.userId,
    );
  }

  showEveryTask(): void {
    this.showAllTasks = true;
    this.tasks = this.allTasks;
  }

  saveTask(taskData: TaskData): void {
    if (taskData.taskId !== null) {
      this.taskService
        .updateTask(taskData.taskId, taskData)
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

  deleteTask(taskId: number): void {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    this.taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe((res) => {
      this.allTasks = res.sort((a, b) =>
        b.dueDate.localeCompare(a.dueDate),
      );

      if (this.showAllTasks) {
        this.tasks = this.allTasks;
      } else {
        this.tasks = this.allTasks.filter(
          (task) => task.userId === this.loginService.currentUser()?.userId,
        );
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  private loadStatuses(): void {
    this.statusService.getStatuses().subscribe((res) => {
      this.statuses = res;
      this.changeDetectorRef.detectChanges();
    });
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      this.users = response;
      this.changeDetectorRef.detectChanges();
    });
  }
}
