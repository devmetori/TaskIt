import { TestBed } from '@angular/core/testing';
import { TaskService } from './Task.service';

describe('TaskService', () => {
    let service: TaskService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskService],
        });
        service = TestBed.inject(TaskService);
    });

    it('Debería crear el servicio', () => {
        expect(service).toBeTruthy();
    });
});
