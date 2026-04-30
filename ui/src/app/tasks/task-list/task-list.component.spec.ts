import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: () => of([]),
            createTask: () => of({}),
            updateTask: () => of({}),
            deleteTask: () => of({}),
            reorderTasks: () => of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
  });

  it('should load tasks on init', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Test', completed: false, order: 0 },
    ];

    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));

    fixture.detectChanges();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].title).toBe('Test');
  });

  it('should toggle task', () => {
    const task: Task = { id: 1, title: 'A', completed: false, order: 0 };

    spyOn(taskService, 'updateTask').and.returnValue(of(task));
    spyOn(taskService, 'getTasks').and.returnValue(of([task]));

    component.toggleTask(task);

    expect(taskService.updateTask).toHaveBeenCalledWith(1, { completed: true });
  });

  it('should delete task', () => {
    const task: Task = { id: 1, title: 'A', completed: false, order: 0 };

    spyOn(taskService, 'deleteTask').and.returnValue(of(void 0));
    spyOn(taskService, 'getTasks').and.returnValue(of([]));

    component.removeTask(task);

    expect(taskService.deleteTask).toHaveBeenCalledWith(1);
  });
});
