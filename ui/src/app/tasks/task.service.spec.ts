import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../environments/environment';
import { Task } from './task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiUrl}/tasks`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load tasks', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Test', completed: false, order: 0 },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a task', () => {
    const newTask = { title: 'New Task' };
    const createdTask: Task = { id: 1, title: 'New Task', completed: false, order: 0 };

    service.createTask(newTask).subscribe((task) => {
      expect(task.id).toBe(1);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(createdTask);
  });

  it('should update a task', () => {
    const updated = { completed: true };

    service.updateTask(1, updated).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a task', () => {
    service.deleteTask(1).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
