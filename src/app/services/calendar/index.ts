import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { startOfDay } from 'date-fns';
import { CalendarEvent } from '../../common/types';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    private selectedDateSubject = new BehaviorSubject<Date>(startOfDay(new Date()));
    selectedDate$ = this.selectedDateSubject.asObservable();

    private events: CalendarEvent[] = [];

    constructor() {}

    selectDate(date: Date): void {
        this.selectedDateSubject.next(startOfDay(date));
    }

    addEvent(event: CalendarEvent): void {
        this.events.push(event);
    }

    getEventsOnDate(date: Date): CalendarEvent[] {
        return this.events.filter((event) => startOfDay(event.date).getTime() === startOfDay(date).getTime());
    }
}
