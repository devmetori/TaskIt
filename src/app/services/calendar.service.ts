import {
    addDays,
    addMonths,
    eachDayOfInterval,
    endOfWeek,
    isSameDay,
    isSameMonth,
    isSameWeek,
    isToday,
    isWeekend,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { Injectable } from '@angular/core';

import { CalendarState } from '@/app/common/types';
import { Store } from './Store';

@Injectable({ providedIn: 'root' })
export class CalendarService {
    private today = new Date();
    readonly Store = new Store<CalendarState>();

    constructor() {
        this.Store.FillState({
            CurrentMonth: this.today,
            SelectedDay: this.today,
            WeekDays: this.GenerateWeekDays(),
            Days: this.GenerateMonthDays(),
        });
    }

    selectDay(date: Date): void {
        this.Store.setState({ SelectedDay: date });
    }

    GenerateWeekDays(referenceDate: Date = new Date()): Date[] {
        const start = startOfWeek(referenceDate, { weekStartsOn: 1 });
        const end = endOfWeek(referenceDate, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    }
    GenerateMonthDays(referenceDate: Date = new Date()): Date[] {
        const startMonth = startOfMonth(referenceDate);
        const start = startOfWeek(startMonth, { weekStartsOn: 1 });
        const end = addDays(start, 41);
        return eachDayOfInterval({ start, end });
    }

    nextMonth(): void {
        const currentMonth = this.Store.Select((state) => state.CurrentMonth)();
        const month = addMonths(currentMonth, 1);
        const DaysOfTheMonth = this.GenerateMonthDays(month);
        this.Store.setState({ CurrentMonth: month, Days: DaysOfTheMonth });
    }

    previousMonth(): void {
        const currentMonth = this.Store.Select((state) => state.CurrentMonth)();
        const month = subMonths(currentMonth, 1);
        const DaysOfTheMonth = this.GenerateMonthDays(month);

        this.Store.setState({ CurrentMonth: month, Days: DaysOfTheMonth });
    }

    isWeekend(date: Date): boolean {
        return isWeekend(date);
    }

    isToday(date: Date): boolean {
        return isToday(date);
    }

    isSelected(date: Date): boolean {
        const selectedDay = this.Store.Select((state) => state.SelectedDay);
        return isSameDay(date, selectedDay());
    }
    isCurrentMonth(date: Date): boolean {
        const currentMonth = this.Store.Select((state) => state.CurrentMonth);
        return !isSameMonth(date, currentMonth());
    }

    SelectToday(): void {
        const DaysOfTheMonth = this.GenerateMonthDays(this.today);
        this.Store.setState({ SelectedDay: this.today, CurrentMonth: this.today, Days: DaysOfTheMonth });
    }
    isRangeDay(date: Date) {
        return {
            isToday: isSameDay(date, this.today),
            isThisWeek: isSameWeek(date, this.today),
            isThisMonth: isSameMonth(date, this.today),
        };
    }
}
