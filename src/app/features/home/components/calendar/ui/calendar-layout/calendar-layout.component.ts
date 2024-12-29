import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isSameDay } from 'date-fns';

import { CalendarService, CalendarControlsComponent } from '@/app/features/home/components/calendar';
import { TTask } from '@/app/shared/models/types';

@Component({
    standalone: true,
    selector: 'app-calendar',
    styleUrl: './calendar-layout.component.scss',
    templateUrl: './calendar-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CalendarControlsComponent],
})
export class CalendarLayoutComponent {
    selectedDay = this.calendarService.Store.Select((state) => state.SelectedDay);
    weekDays = this.calendarService.Store.Select((state) => state.WeekDays);
    Days = this.calendarService.Store.Select((state) => state.Days);
    @Input() CalendarEvents: TTask[] = [];

    constructor(private readonly calendarService: CalendarService) {}

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
}
