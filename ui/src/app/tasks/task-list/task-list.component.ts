import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskEditorComponent } from '../task-editor/task-editor.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, TaskEditorComponent, DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;

  editorVisible = false;
  editingTask: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasks = this.tasks.map((t, i) => ({ ...t, position: i }));
    this.taskService.reorderTasks(this.tasks).subscribe();
  }

  openCreate() {
    this.editingTask = null;
    this.editorVisible = true;
  }

  openEdit(task: Task) {
    this.editingTask = task;
    this.editorVisible = true;
  }

  closeEditor() {
    this.editorVisible = false;
  }

  saveTask(data: Partial<Task>) {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id, data).subscribe(() => {
        this.closeEditor();
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(data).subscribe(() => {
        this.closeEditor();
        this.loadTasks();
      });
    }
  }

  updateStatus(task: Task) {
    this.taskService.updateTask(task.id, { status: task.status })
      .subscribe(() => this.loadTasks());
  }

  removeTask(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => this.loadTasks());
  }
}
