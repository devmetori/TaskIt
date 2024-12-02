import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TaskItemComponent } from './task-item.component';
import { TTask } from '@/app/common/types';
import { By } from '@angular/platform-browser';

const data: TTask[] = [
    {
        completed: false,
        id: '2',
        dateEnd: new Date(),
        dateStart: new Date(),
        description: 'Tareas por hacer',
        priority: 2,
        priorityColor: 'yellow',
        tags: [],
    },

    {
        completed: false,
        id: '3',
        dateEnd: new Date(),
        dateStart: new Date(),
        description: 'Tareas por hacer',
        priority: 3,
        priorityColor: 'red',
        tags: [],
    },

    {
        completed: false,
        id: '4',
        dateEnd: new Date(),
        dateStart: new Date(),
        description: 'Tareas por hacer',
        priority: 1,
        priorityColor: 'green',
        tags: [],
    },
];
describe('TaskItemComponent', () => {
    let component: TaskItemComponent;
    let fixture: ComponentFixture<TaskItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería emitir el evento de eliminación', () => {
        vi.spyOn(component.checkTask, 'emit');
        component.check(data[0]);
        expect(component.checkTask.emit).toHaveBeenCalled();
    });

    it('Debería emitir el evento de edición', () => {
        vi.spyOn(component.editTask, 'emit');
        const newTask = { ...data[0] };
        component.OpenModalEditTask(newTask);
        expect(component.editTask.emit).toHaveBeenCalledWith(newTask);
    });

    it('Debería mostrar la descripción de la tarea', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.item .description')).nativeElement;
        component.task = data[0];
        fixture.detectChanges();
        expect(descriptionElement.textContent).toContain(component.task.description);
    });
});
