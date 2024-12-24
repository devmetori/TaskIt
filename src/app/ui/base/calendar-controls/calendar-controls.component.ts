import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarService } from '@/app/services';

@Component({
    selector: 'app-calendar-controls',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar-controls.component.html',
    styleUrl: './calendar-controls.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarControlsComponent {
    CurrentMonth = this.calendarService.Store.Select((state) => state.CurrentMonth);

    constructor(private readonly calendarService: CalendarService) {}

    nextMonth(): void {
        this.calendarService.nextMonth();
    }

    previousMonth(): void {
        this.calendarService.previousMonth();
    }
    SelectCurrentDate(): void {
        this.calendarService.SelectToday();
    }
}
