import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { TaskInputComponent } from './input-task.component';

describe('TaskInputComponent', () => {
    let component: TaskInputComponent;
    let fixture: ComponentFixture<TaskInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskInputComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TaskInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería emitir el evento de agregar una tarea con una descripción', () => {
        vi.spyOn(component.addTask, 'emit');
        const formTag = fixture.debugElement.query(By.css('.new-task')).nativeElement;
        component.task = { description: 'Tarea por hacer', date: new Date(), priority: 1, endDate: new Date() };
        fixture.detectChanges();
        formTag.dispatchEvent(new Event('submit'));
        expect(component.addTask.emit).toHaveBeenCalledWith(component.task);
    });
});
