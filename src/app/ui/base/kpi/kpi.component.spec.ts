import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiComponent } from './kpi.component';

describe('KpiComponent', () => {
    let component: KpiComponent;
    let fixture: ComponentFixture<KpiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KpiComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(KpiComponent);
        fixture.autoDetectChanges(true);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debe crearse correctamente el componente', () => {
        expect(component).toBeTruthy();
    });

    it('No debe tener un valor por defecto', () => {
        expect(component.title).toBe('');
        expect(component.KPI).not.toHaveProperty('completed');
        expect(component.KPI).not.toHaveProperty('total');
    });

    it('Debe asignarse correctamente los valores de KPI', () => {
        const kpi = { completed: 1, total: 2 };
        component.KPI = kpi;
        expect(component.KPI).toEqual(kpi);
        expect(component.KPI.completed).toEqual(1);
        expect(component.KPI.total).toEqual(2);
    });

    it('Debe añadirse un título', () => {
        const title = 'Titulo';
        component.title = title;
        expect(component.title).toEqual(title);
    });

    it('Debe renderizarse correctamente el contenedor padre del componente', () => {
        const element = fixture.nativeElement.querySelector('.kpi');
        expect(element).toBeTruthy();
        expect(element.classList.contains('kpi')).toBe(true);
        const children = element.children.length;
        expect(children).toBe(2);
    });
});
