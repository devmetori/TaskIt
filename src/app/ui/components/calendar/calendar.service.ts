import { isSameDay, startOfDay } from 'date-fns';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CalendarService {
    private _selectedDate = new BehaviorSubject<Date>(startOfDay(new Date()));
    selectedDate$ = this._selectedDate.asObservable();

    constructor() {}

    selectDate(date: Date): void {
        this._selectedDate.next(startOfDay(date));
    }

    isSelected(date: Date): boolean {
        return isSameDay(date, this._selectedDate.getValue());
    }
}
