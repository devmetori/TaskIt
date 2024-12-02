import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isSameDay } from 'date-fns';
import { Subscription } from 'rxjs';

import { CalendarControlsComponent } from '@/app/ui/base';
import { CalendarService } from '@/app/services';
import { TTask } from '@/app/common/types';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule, CalendarControlsComponent],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnDestroy {
    @Input() CalendarEvents: TTask[] = [];
    today: Date = new Date();
    days: Date[] = [];
    currentMonth: Date = new Date();
    selectedDay: Date = new Date();
    weekDays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    private subscriptions = new Subscription();

    constructor(private calendarService: CalendarService) {
        this.subscriptions.add(
            this.calendarService.selectedDate$.subscribe((date) => {
                this.selectedDay = date;
            }),
        );
        this.subscriptions.add(
            this.calendarService.Days$.subscribe((date) => {
                this.days = date;
            }),
        );
    }

    selectDay(day: Date): void {
        this.calendarService.selectDay(day);
    }
    isWeekend(date: Date): boolean {
        return this.calendarService.isWeekend(date);
    }

    isToday(date: Date): boolean {
        return this.calendarService.isToday(date);
    }

    isSelected(date: Date): boolean {
        return this.calendarService.isSelected(date);
    }
    isCurrentMonth(date: Date): boolean {
        return this.calendarService.isCurrentMonth(date);
    }

    hasEvents(date: Date): boolean {
        return this.CalendarEvents.some((task) => isSameDay(task.dateStart, date));
    }
    SelectToday(): void {
        this.calendarService.SelectToday();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
