import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusType } from '../../services/status-service';
import { Task, TaskData } from '../../services/task-service';
import { User } from '../../services/user-service';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask implements OnInit {
  @Input() task: Task | null = null;
  @Input() statuses: StatusType[] = [];
  @Input() users: User[] = [];
  @Output() save = new EventEmitter<TaskData>();
  @Output() cancel = new EventEmitter<void>();

  model: TaskData = {
    taskId: null,
    name: '',
    dueDate: '',
    statusName: '',
    userId: 0,
    createdBy: 'frontend',
  };

  ngOnInit(): void {
    if (this.task) {
      this.model.taskId = this.task.taskId;
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
      taskId: this.model.taskId,
      name: this.model.name,
      dueDate: this.model.dueDate,
      statusName: this.model.statusName,
      userId: this.model.userId,
      createdBy: this.model.createdBy,
    });
  }
}
