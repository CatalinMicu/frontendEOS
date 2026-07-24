import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusType } from '../../services/status-service';
import { Task, TaskData } from '../../services/task-service';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask implements OnInit {
  private loginService = inject(LoginService);

  @Input() task: Task | null = null;
  @Input() statuses: StatusType[] = [];
  @Output() save = new EventEmitter<TaskData>();
  @Output() cancel = new EventEmitter<void>();

  model: TaskData = {
    name: '',
    dueDate: '',
    statusName: '',
    userId: this.loginService.currentUser()?.userId ?? 0,
    createdBy: 'frontend',
  };

  ngOnInit(): void {
    if (this.task) {
      this.model.name = this.task.name;
      this.model.dueDate = this.task.dueDate;
      this.model.statusName = this.task.statusName;
      this.model.userId = this.task.userId;
      this.model.createdBy = this.task.createdBy;
    } else if (this.statuses.length > 0) {
      this.model.statusName = this.statuses[0].statusName;
    }
  }

  submit(): void {
    this.save.emit({
      name: this.model.name,
      dueDate: this.model.dueDate,
      statusName: this.model.statusName,
      userId: this.model.userId,
      createdBy: this.model.createdBy,
    });
  }
}
