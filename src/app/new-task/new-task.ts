import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusType, Task, TaskData } from '../../services/tasks';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask implements OnInit {
  @Input() task: Task | null = null;
  @Input() statuses: StatusType[] = [];
  @Output() save = new EventEmitter<TaskData>();
  @Output() cancel = new EventEmitter<void>();

  model: TaskData = {
    name: '',
    dueDate: '',
    statusName: '',
    userId: 2,
    createdBy: 'frontend',
  };

  ngOnInit(): void {
    if (this.task) {
      const { taskId, ...taskData } = this.task;
      this.model = { ...taskData };
    } else if (this.statuses.length > 0) {
      this.model.statusName = this.statuses[0].statusName;
    }
  }

  submit(): void {
    this.save.emit({ ...this.model });
  }
}
