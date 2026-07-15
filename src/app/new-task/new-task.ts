import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskData } from '../../services/tasks';

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css',
})
export class NewTask implements OnInit {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<TaskData>();
  @Output() cancel = new EventEmitter<void>();

  model: TaskData = {
    name: '',
    dueDate: '',
    statusTypeId: 'OPEN',
    userId: 2,
    createdBy: 'frontend',
  };

  ngOnInit(): void {
    if (this.task) {
      const { taskId, ...taskData } = this.task;
      this.model = { ...taskData };
    }
  }

  submit(): void {
    this.save.emit({ ...this.model });
  }
}
