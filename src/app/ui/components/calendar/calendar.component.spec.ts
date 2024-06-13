import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CalendarComponent } from './calendar.component';
import { UUID } from '@/app/common';
import { globalProviders } from '@/app/test/setup.spect';
const data = [
    {
        id: UUID(),
        dateEnd: new Date('2024-04-01'),
        dateStart: new Date('2024-04-01'),
        description: 'Evento 1',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-02'),
        dateStart: new Date('2024-04-02'),
        description: 'Evento 2',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-03'),
        dateStart: new Date('2024-04-03'),
        description: 'Evento 3',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-04'),
        dateStart: new Date('2024-04-04'),
        description: 'Evento 4',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-05'),
        dateStart: new Date('2024-04-05'),
        description: 'Evento 5',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-06'),
        dateStart: new Date('2024-04-06'),
        description: 'Evento 6',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-07'),
        dateStart: new Date('2024-04-07'),
        description: 'Evento 7',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },

    {
        id: UUID(),
        dateEnd: new Date('2024-04-08'),
        dateStart: new Date('2024-04-08'),
        description: 'Evento 8',
        completed: false,
        priority: 1,
        priorityColor: 'red',
        tags: [],
    },
];

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

    it('Debería generar el calendario al inicializarse', () => {
        component.generateCalendar();
        expect(component.days.length).toBeGreaterThan(0);
    });

    it('Debería avanzar al siguiente mes al llamar a nextMonth()', () => {
        const previousMonth = component.currentMonth.getMonth();
        component.nextMonth();
        const currentMonth = component.currentMonth.getMonth();
        expect(currentMonth).toBe(previousMonth + 1);
    });

    it('Debería retroceder al mes anterior al llamar a previousMonth()', () => {
        const nextMonth = component.currentMonth.getMonth();
        component.previousMonth();
        const currentMonth = component.currentMonth.getMonth();
        expect(currentMonth).toBe(nextMonth - 1);
    });

    it('Debería llamar a selectDay() al hacer clic en un día', () => {
        jest.spyOn(component, 'selectDay');
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
        component.CalendarEvents = data;
        fixture.detectChanges();

        expect(component.hasEvents(dateWithEvents)).toBe(true);
    });

    it('Debería devolver false si el día no tiene eventos', () => {
        const dateWithoutEvents = new Date('2024-04-01');
        component.CalendarEvents = [];
        fixture.detectChanges();

        expect(component.hasEvents(dateWithoutEvents)).toBe(false);
    });

    it('Debería devolver true si el día es el mismo que el seleccionado', () => {
        const selectedDate = new Date('2024-04-01');
        component.selectedDate = selectedDate;
        fixture.detectChanges();

        expect(component.isSelected(selectedDate)).toBe(true);
    });

    it('Debería devolver false si el día no es el mismo que el seleccionado', () => {
        const selectedDate = new Date('2024-04-01');
        const otherDate = new Date('2024-04-02');
        component.selectedDate = selectedDate;
        fixture.detectChanges();

        expect(component.isSelected(otherDate)).toBe(false);
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
