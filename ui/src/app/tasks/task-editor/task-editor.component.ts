import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss'],
})
export class TaskEditorComponent implements OnChanges {
  @Input() task: Task | null = null;
  @Output() save = new EventEmitter<Partial<Task>>();
  @Output() cancel = new EventEmitter<void>();

  title = '';
  description = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      if (this.task) {
        this.title = this.task.title;
        this.description = this.task.description ?? '';
      } else {
        this.title = '';
        this.description = '';
      }
    }
  }

  onSave() {
    this.save.emit({
      ...this.task,
      title: this.title,
      description: this.description,
    });
  }
}
