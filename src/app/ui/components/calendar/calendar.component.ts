import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isSameDay } from 'date-fns';

import { CalendarControlsComponent } from '@/app/ui/base';
import { CalendarService } from '@/app/services';
import { TTask } from '@/app/common/types';

@Component({
    standalone: true,
    selector: 'app-calendar',
    styleUrl: './calendar.component.scss',
    templateUrl: './calendar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CalendarControlsComponent],
})
export class CalendarComponent {
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
