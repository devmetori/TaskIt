import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

import { CalendarComponent } from './calendar.component';
import { globalProviders, Todos } from '@/app/test';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalendarComponent],
            providers: globalProviders,
        }).compileComponents();

        fixture = TestBed.createComponent(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Debería crearse el compenent', () => {
        expect(component).toBeTruthy();
    });

    it('Debería tener un calendario', () => {
        const calendar = fixture.debugElement.query(By.css('.calendar'));
        expect(calendar).toBeTruthy();
    });

    it('Debería tener el mes actual seleccionado por defecto', () => {
        expect(component.currentMonth.getMonth()).toBe(new Date().getMonth());
    });

    it('Debería llamar a selectDay() al hacer clic en un día', () => {
        vi.spyOn(component, 'selectDay');
        fixture.detectChanges();

        const dayElement = fixture.debugElement.query(By.css('.cell'));
        dayElement.triggerEventHandler('click', null);

        expect(component.selectDay).toHaveBeenCalled();
    });

    it('Debería renderizar correctamente los días del calendario', () => {
        component.days = [
            new Date('2024-04-01'),
            new Date('2024-04-02'),
            new Date('2024-04-03'),
            new Date('2024-04-04'),
            new Date('2024-04-05'),
            new Date('2024-04-06'),
            new Date('2024-04-07'),
            new Date('2024-04-08'),
            new Date('2024-04-09'),
            new Date('2024-04-10'),
        ];
        fixture.detectChanges();

        const dayElements = fixture.debugElement.queryAll(By.css('.day'));

        expect(dayElements.length).toBe(10);
        expect(dayElements[0].nativeElement.textContent).toBe(' 1 ');
        expect(dayElements[1].nativeElement.textContent).toBe(' 2 ');
        expect(dayElements[2].nativeElement.textContent).toBe(' 3 ');
        expect(dayElements[3].nativeElement.textContent).toBe(' 4 ');
        expect(dayElements[4].nativeElement.textContent).toBe(' 5 ');
        expect(dayElements[5].nativeElement.textContent).toBe(' 6 ');
        expect(dayElements[6].nativeElement.textContent).toBe(' 7 ');
        expect(dayElements[7].nativeElement.textContent).toBe(' 8 ');
        expect(dayElements[8].nativeElement.textContent).toBe(' 9 ');
        expect(dayElements[9].nativeElement.textContent).toBe(' 10 ');
    });
    it('Debería devolver true si el día tiene eventos', () => {
        const dateWithEvents = new Date('2024-04-01');
        component.CalendarEvents = Todos;
        fixture.detectChanges();

        expect(component.hasEvents(dateWithEvents)).toBe(true);
    });

    it('Debería devolver false si el día no tiene eventos', () => {
        const dateWithoutEvents = new Date('2024-04-01');
        component.CalendarEvents = [];
        fixture.detectChanges();

        expect(component.hasEvents(dateWithoutEvents)).toBe(false);
    });

    it('Debería devolver true si el día es fin de semana', () => {
        const weekendDate = new Date('2024-04-28');
        expect(component.isWeekend(weekendDate)).toBe(true);
    });

    it('Debería devolver false si el día no es fin de semana', () => {
        const weekdayDate = new Date('2024-04-30');
        expect(component.isWeekend(weekdayDate)).toBe(false);
    });

    it('Debería devolver true si el día es hoy', () => {
        const today = new Date();
        expect(component.isToday(today)).toBe(true);
    });

    it('Debería devolver false si el día no es hoy', () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        expect(component.isToday(tomorrow)).toBe(false);
    });
});
