import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
    let service: CalendarService;

    beforeEach(() => {
        service = new CalendarService();
    });

    it('Debería ser creado el servicio', () => {
        expect(service).toBeTruthy();
    });

    it('Debería tener una fecha seleccionada predeterminada', () => {
        service.selectedDate$.subscribe((date) => {
            expect(date).toBeDefined();
            //expect(date).toEqual(new Date());
        });
    });

    it('Debería actualizar la fecha seleccionada', () => {
        const newDate = new Date(2022, 0, 1);
        service.selectDay(newDate);
        service.selectedDate$.subscribe((date) => {
            expect(date).toEqual(newDate);
        });
    });

    it('Debería verificar si una fecha está seleccionada', () => {
        const selectedDate = new Date(2022, 0, 1);
        service.selectDay(selectedDate);
        expect(service.isSelected(selectedDate)).toBe(true);

        const otherDate = new Date(2022, 0, 2);
        expect(service.isSelected(otherDate)).toBe(false);
    });
});
