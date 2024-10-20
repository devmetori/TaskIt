import { CalendarService } from '@/app/services/calendar.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-calendar-controls',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar-controls.component.html',
    styleUrl: './calendar-controls.component.scss',
})
export class CalendarControlsComponent {
    private subscriptions = new Subscription();
    currentMonth: Date = new Date();
    constructor(private readonly calendarService: CalendarService) {
        this.subscriptions.add(
            this.calendarService.currentMonth$.subscribe((date) => {
                this.currentMonth = date;
            }),
        );
    }

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
