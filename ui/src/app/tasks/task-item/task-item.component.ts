import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';
import { TaskStatus } from '../task-status';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() statusChange = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  readonly statuses = Object.values(TaskStatus);

  onStatusChange(event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as TaskStatus;
    this.statusChange.emit({ ...this.task, status: newStatus });
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onRemove() {
    this.remove.emit(this.task);
  }
}
