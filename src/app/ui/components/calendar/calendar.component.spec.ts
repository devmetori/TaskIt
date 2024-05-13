import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { By } from '@angular/platform-browser';

describe('CalendarComponent', () => {
    let component: CalendarComponent;
    let fixture: ComponentFixture<CalendarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalendarComponent],
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
});
