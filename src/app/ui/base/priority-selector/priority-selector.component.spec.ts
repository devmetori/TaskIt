import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritySelectorComponent } from './priority-selector.component';

describe('PrioritySelectorComponent', () => {
    let component: PrioritySelectorComponent;
    let fixture: ComponentFixture<PrioritySelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PrioritySelectorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PrioritySelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debería crearse el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería tener los valores predeterminados correctos', () => {
        expect(component.selected).toBe(1);
        expect(component.size).toBe('sm');
        expect(component.direction).toBe('hr');
    });

    it('Debería emitir el valor correcto cuando se llama a onChangePriority', () => {
        const level = 2;
        jest.spyOn(component.onChange, 'emit');
        component.onChangePriority(level);
        expect(component.onChange.emit).toHaveBeenCalledWith(level);
    });

    it('Debería establecer las clases CSS correctas según los valores de tamaño y dirección', () => {
        component.size = 'lg';
        component.direction = 'vr';
        fixture.detectChanges();
        const prioritySelectorElement = fixture.nativeElement.querySelector('.priorities');
        expect(prioritySelectorElement.classList).toContain('lg');
        expect(prioritySelectorElement.classList).toContain('vr');
    });

    it('Debería renderizar el número correcto de opciones de prioridad', () => {
        const priorityOptions = fixture.nativeElement.querySelectorAll('.priorities .priority');
        expect(priorityOptions.length).toBe(component.priorities.length);
    });

    it('Debería actualizar el valor seleccionado cuando se hace clic en una opción de prioridad', () => {
        const level = 3;
        const priorityOption = fixture.nativeElement.querySelectorAll(
            ".priorities input[name='priority']",
        ) as HTMLInputElement[];
        priorityOption[2].click();

        expect(component.selected).toBe(level);
    });
});
