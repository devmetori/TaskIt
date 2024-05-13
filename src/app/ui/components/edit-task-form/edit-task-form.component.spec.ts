import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { EditTaskFormComponent } from './edit-task-form.component';

describe('EditTaskFormComponent', () => {
    let component: EditTaskFormComponent;
    let fixture: ComponentFixture<EditTaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditTaskFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditTaskFormComponent);
        component = fixture.componentInstance;
        component.task = {
            id: '1',
            description: 'Tarea 1',
            dateStart: new Date(),
            dateEnd: new Date(),
            tags: [],
            completed: false,
            priority: 1,
            priorityColor: 'green',
        };
        fixture.detectChanges();
    });

    it('Debería crear  el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería haver un formulario', () => {
        const form = fixture.debugElement.query(By.css('form'));
        expect(form).toBeTruthy();
    });

    it('Debería emitir  un evento cuando se hace submit en el formulario', () => {
        jest.spyOn(component.OnFinish, 'emit');
        const form = fixture.debugElement.query(By.css('form'));
        form.nativeElement.dispatchEvent(new Event('submit'));
        expect(component.OnFinish.emit).toHaveBeenCalled();
    });

    it('Debería se elimina la tares también debe emitir un evento de notificació para cerrar el', () => {
        jest.spyOn(component.OnFinish, 'emit');
        jest.spyOn(component, 'deteleTask');
        const btnDelete = fixture.debugElement.query(By.css('.btn--danger'));

        btnDelete.nativeElement.dispatchEvent(new Event('click'));

        expect(component.deteleTask).toHaveBeenCalled();
        expect(component.OnFinish.emit).toHaveBeenCalled();
    });
});
