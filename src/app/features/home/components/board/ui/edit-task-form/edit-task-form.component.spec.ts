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
});
