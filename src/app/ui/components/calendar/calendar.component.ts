import {
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    isToday,
    isWeekend,
    isSameMonth,
} from 'date-fns';

import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CalendarService } from './calendar.service';
import { TTask } from '@app/common/types';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnDestroy {
    @Input() CalendarEvents: TTask[] = [];
    today: Date = new Date();
    days: Date[] = [];
    currentMonth: Date = new Date();
    selectedDate: Date = new Date();
    weekDays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    private subscriptions = new Subscription();

    constructor(private calendarService: CalendarService) {
        this.subscriptions.add(
            this.calendarService.selectedDate$.subscribe((date) => {
                this.selectedDate = date;
            }),
        );
        this.generateCalendar();
    }

    generateCalendar(): void {
        const startDay = startOfMonth(this.currentMonth);
        const endDay = endOfMonth(this.currentMonth);
        const firstDayOfWeek = startOfWeek(startDay, { weekStartsOn: 1 });
        const lastDayOfWeek = endOfWeek(endDay, { weekStartsOn: 1 });
        this.days = eachDayOfInterval({ start: firstDayOfWeek, end: lastDayOfWeek });
    }

    nextMonth(): void {
        this.currentMonth = addMonths(this.currentMonth, 1);
        this.generateCalendar();
    }

    previousMonth(): void {
        this.currentMonth = subMonths(this.currentMonth, 1);
        this.generateCalendar();
    }

    selectDay(day: Date): void {
        this.calendarService.selectDate(day);
    }
    isWeekend(date: Date): boolean {
        return isWeekend(date);
    }

    isToday(date: Date): boolean {
        return isToday(date);
    }

    isSelected(date: Date): boolean {
        return isSameDay(date, this.selectedDate);
    }
    isCurrentMonth(date: Date): boolean {
        return !isSameMonth(date, this.currentMonth);
    }

    hasEvents(date: Date): boolean {
        return this.CalendarEvents.some((task) => isSameDay(task.dateStart, date));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
