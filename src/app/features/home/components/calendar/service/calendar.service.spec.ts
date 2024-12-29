import { TestBed } from '@angular/core/testing';
import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
    let service: CalendarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CalendarService],
        });
        service = TestBed.inject(CalendarService);
    });

    it('Debería ser creado el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('Debería tener una fecha seleccionada predeterminada', () => {
        const todoy = new Date();
        const SelectedDay = service.Store.Select((state) => state.SelectedDay)();
        expect(SelectedDay.toDateString()).toBeDefined();
        expect(SelectedDay.toDateString()).toEqual(todoy.toDateString());
    });

    it('Debería actualizar la fecha seleccionada', () => {
        const newDate = new Date(2022, 0, 1);
        service.selectDay(newDate);

        const SelectedDay = service.Store.Select((state) => state.SelectedDay)();

        expect(SelectedDay).toEqual(newDate);
    });

    it('Debería verificar si una fecha está seleccionada', () => {
        const selectedDate = new Date(2022, 0, 1);
        service.selectDay(selectedDate);
        expect(service.isSelected(selectedDate)).toBe(true);

        const otherDate = new Date(2022, 0, 2);
        expect(service.isSelected(otherDate)).toBe(false);
    });
});
