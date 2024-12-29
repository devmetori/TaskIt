import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { SortSelectorComponent } from './sort-selector.component';

describe('SortSelectorComponent', () => {
    let component: SortSelectorComponent;
    let fixture: ComponentFixture<SortSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SortSelectorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SortSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('Debería tener opciones de clasificación', () => {
        expect(component.sortOptions.length).toBeGreaterThan(0);
    });

    it('Debería seleccionar la primera opción por defecto', () => {
        expect(component.selectedOption).toEqual(component.sortOptions[0]);
    });

    it('Debería emitir el evento onChange al seleccionar una opción', () => {
        vi.spyOn(component.Select, 'emit');
        const option = component.sortOptions[1];
        component.optionSelected(option);
        expect(component.Select.emit).toHaveBeenCalledWith(option);
    });

    it('Debería actualizar la opción seleccionada al seleccionar una opción', () => {
        const option = component.sortOptions[2];
        component.optionSelected(option);
        expect(component.selectedOption).toEqual(option);
    });

    it('Debería tener un método selectOption que se llame al seleccionar una opción', () => {
        vi.spyOn(component, 'selectOption');
        const option = component.sortOptions[3];
        const select = fixture.nativeElement.querySelector('select');
        select.value = option.value;
        select.dispatchEvent(new Event('change'));
        expect(component.selectOption).toHaveBeenCalled();
    });
});
