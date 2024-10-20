import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarControlsComponent } from './calendar-controls.component';
import { globalProviders } from '@/app/test/setup.spect';

describe('CalendarControlsComponent', () => {
    let component: CalendarControlsComponent;
    let fixture: ComponentFixture<CalendarControlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalendarControlsComponent],
            providers: globalProviders,
        }).compileComponents();

        fixture = TestBed.createComponent(CalendarControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
