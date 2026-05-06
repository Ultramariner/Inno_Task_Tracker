import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { TaskStatus } from '../task-status';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const taskServiceMock = jasmine.createSpyObj('TaskService', [
      'getTasks',
      'createTask',
      'updateTask',
      'deleteTask',
      'reorderTasks'
    ]);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should load tasks on init', () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'Test',
        description: 'Desc',
        status: TaskStatus.TODO,
        position: 0
      }
    ];

    taskService.getTasks.and.returnValue(of(mockTasks));

    fixture.detectChanges();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test');
  });

  it('should update task status', () => {
    const task: Task = {
      id: 1,
      title: 'A',
      description: 'B',
      status: TaskStatus.TODO,
      position: 0
    };

    taskService.updateTask.and.returnValue(of(task));
    taskService.getTasks.and.returnValue(of([task]));

    component.updateStatus({ ...task, status: TaskStatus.DONE });

    expect(taskService.updateTask)
      .toHaveBeenCalledWith(1, { status: TaskStatus.DONE });
  });

  it('should delete task', () => {
    const task: Task = {
      id: 1,
      title: 'A',
      description: 'B',
      status: TaskStatus.TODO,
      position: 0
    };

    taskService.deleteTask.and.returnValue(of(void 0));
    taskService.getTasks.and.returnValue(of([]));

    component.removeTask(task);

    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
  });
});
