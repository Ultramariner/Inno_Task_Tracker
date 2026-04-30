import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;

  @Output() toggle = new EventEmitter<Task>();
  @Output() edit = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();

  onToggle() {
    this.toggle.emit(this.task);
  }

  onEdit() {
    this.edit.emit(this.task);
  }

  onRemove() {
    this.remove.emit(this.task);
  }
}
