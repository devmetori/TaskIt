import {
    addMonths,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    isSameDay,
    isSameMonth,
    isToday,
    isWeekend,
    startOfDay,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    private _selectedDay = new BehaviorSubject<Date>(startOfDay(new Date()));
    selectedDate$ = this._selectedDay.asObservable();
    private _currentMonth = new BehaviorSubject<Date>(new Date());
    currentMonth$ = this._currentMonth.asObservable();
    private _Days = new BehaviorSubject<Date[]>([]);
    Days$ = this._Days.asObservable();

    constructor() {
        this.generateCalendar();
    }

    selectDay(date: Date): void {
        this._selectedDay.next(date);
    }

    generateCalendar(): void {
        const startDay = startOfMonth(this._currentMonth.getValue());
        const endDay = endOfMonth(this._currentMonth.getValue());
        const start = startOfWeek(startDay, { weekStartsOn: 1 });
        const end = endOfWeek(endDay, { weekStartsOn: 1 });
        const days = eachDayOfInterval({ start, end });
        this._Days.next(days);
    }

    nextMonth(): void {
        const month = addMonths(this._currentMonth.getValue(), 1);
        this._currentMonth.next(month);
        this.generateCalendar();
    }

    previousMonth(): void {
        const month = subMonths(this._currentMonth.getValue(), 1);
        this._currentMonth.next(month);
        this.generateCalendar();
    }

    isWeekend(date: Date): boolean {
        return isWeekend(date);
    }

    isToday(date: Date): boolean {
        return isToday(date);
    }

    isSelected(date: Date): boolean {
        return isSameDay(date, this._selectedDay.getValue());
    }
    isCurrentMonth(date: Date): boolean {
        return !isSameMonth(date, this._currentMonth.getValue());
    }

    SelectToday(): void {
        const today = new Date();
        this.selectDay(today);
        this._currentMonth.next(today);
        this.generateCalendar();
    }
}
