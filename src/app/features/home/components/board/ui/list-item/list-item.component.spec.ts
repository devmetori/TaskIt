import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { ListItemComponent } from './list-item.component';
import { defaultKpi } from '@/app/shared/data';
import { UUID } from '@/app/core/utils';

describe('ListItemComponent', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ListItemComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Debería emitir el ID de la lista el elimnar uno de la lista', () => {
        vi.spyOn(component.remove, 'emit');
        const id = UUID(6);
        component.list = {
            id,
            name: 'Lista 1',
            KPI: defaultKpi,
            Tasks: [],
        };
        fixture.detectChanges();

        const btnDelete = fixture.debugElement.query(By.css('.on-delete'));
        btnDelete.triggerEventHandler('click', null);

        expect(component.remove.emit).toHaveBeenCalledWith(id);
    });

    it('Debería  cambiar el nombre de la llista cuando se cambia el valor del input', () => {
        vi.spyOn(component.newName, 'emit');
        const id = UUID(6);
        const newName = 'Lista 2';
        component.list = {
            id,
            name: 'Lista 1',
            KPI: defaultKpi,
            Tasks: [],
        };
        fixture.detectChanges();

        const field = fixture.debugElement.query(By.css('.text'));
        field.nativeElement.value = newName;
        field.nativeElement.dispatchEvent(new Event('blur'));
        expect(component.newName.emit).toHaveBeenCalledWith(newName);
    });
});
