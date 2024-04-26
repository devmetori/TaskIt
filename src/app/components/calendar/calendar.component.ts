import {
    eachDayOfInterval,
    startOfMonth,
    endOfMonth,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
    isSameDay,
    getDay,
} from 'date-fns';
import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { CalendarService } from '../../services';
import { TTask } from '../../common/types';

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
    currentMonth: Date = new Date();
    selectedDate: Date = new Date();
    weekDays: string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    days: Date[] = [];
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

    getWeeks(): Date[][] {
        const weeks: Date[][] = [];
        let week: Date[] = [];

        this.days.forEach((day, index) => {
            week.push(day);
            if ((index + 1) % 7 === 0 || index === this.days.length - 1) {
                weeks.push(week);
                week = [];
            }
        });

        return weeks;
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
        const day = getDay(date);
        return day === 0 || day === 6; // 0 = Domingo, 6 = Sábado
    }

    isToday(date: Date): boolean {
        return isSameDay(date, this.today);
    }

    isSelected(date: Date): boolean {
        return isSameDay(date, this.selectedDate);
    }

    hasEvents(date: Date): boolean {
        return this.CalendarEvents.some((task) => isSameDay(task.dateStart, date));
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
