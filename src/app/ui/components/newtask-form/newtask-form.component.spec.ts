import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaskFormComponent } from './newtask-form.component';
import { By } from '@angular/platform-browser';

const task = { description: 'Tarea por hacer', date: new Date(), priority: 1, endDate: new Date() };
describe('Componente NewtaskForm', () => {
    let component: NewtaskFormComponent;
    let fixture: ComponentFixture<NewtaskFormComponent>;
    let formTag: HTMLFormElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewtaskFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NewtaskFormComponent);
        component = fixture.componentInstance;
        formTag = fixture.debugElement.query(By.css('.task-form')).nativeElement;
        fixture.detectChanges();
    });

    it('Debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería tener un formulario', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('form')).toBeTruthy();
    });

    it('Debería emitir el evento de agregar una tarea con una descripción', () => {
        jest.spyOn(component.OnFinish, 'emit');
        component.task = task;
        fixture.detectChanges();
        formTag.dispatchEvent(new Event('submit'));
        expect(component.OnFinish.emit).toHaveBeenCalled();
    });

    it('Debería asignar una fecha a la tarea', () => {
        const date = new Date();
        component.task = { ...task, date };
        fixture.detectChanges();
        formTag.dispatchEvent(new Event('submit'));
        expect(component.task.date).toBeTruthy();
        expect(component.task.date).toEqual(date);
    });

    it('Debería asignar una prioridad a la tarea', () => {
        const priority = 1;
        component.task = { ...task, priority: 1 };
        fixture.detectChanges();
        formTag.dispatchEvent(new Event('submit'));
        expect(component.task.priority).toBeTruthy();
        expect(component.task.priority).toEqual(priority);
    });

    it('Debería asignar una fecha de finalización a la tarea', () => {
        const endDate = new Date();
        component.task = { ...task, endDate };
        fixture.detectChanges();
        formTag.dispatchEvent(new Event('submit'));
        expect(component.task.endDate).toBeTruthy();
        expect(component.task.endDate).toEqual(endDate);
    });
});
