import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { TaskItemComponent } from './task-item.component';
import { Todos } from '@/app/test';

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
        component.check(Todos[0]);
        expect(component.checkTask.emit).toHaveBeenCalled();
    });

    it('Debería emitir el evento de edición', () => {
        vi.spyOn(component.editTask, 'emit');
        const newTask = { ...Todos[0] };
        component.OpenModalEditTask(newTask);
        expect(component.editTask.emit).toHaveBeenCalledWith(newTask);
    });

    it('Debería mostrar la descripción de la tarea', () => {
        const descriptionElement = fixture.debugElement.query(By.css('.item .description')).nativeElement;
        component.task = Todos[0];
        fixture.detectChanges();
        expect(descriptionElement.textContent).toContain(component.task.description);
    });
});
