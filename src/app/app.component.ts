import { Component } from '@angular/core';
import { TaskComponent } from '@/app/ui';
import { ScreenSizeDirective } from '@/app/common/directives';
import { screenSize } from '@/app/common/data';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [TaskComponent, ScreenSizeDirective],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    breakpoints = screenSize;
    /*     lists: TTodoList[] = [];
    selectedDate: Date = new Date();
    selectedList: TTodoList = {} as TTodoList;

    private Subscription: Subscription = new Subscription();

    sortOptions: TSortOption[] = [
        { value: 'description', label: 'Descripcion', asc: true },
        { value: 'date', label: 'Fecha', asc: true },
        { value: 'priority', label: 'Prioridad', asc: true },
        { value: 'status', label: 'Estado', asc: true },
    ];
    constructor(
        private taskService: TaskService,
        private calendarService: CalendarService,
    ) {}
    ngOnInit(): void {
        this.Subscription.add(
            this.taskService.lists$.subscribe((lists) => {
                this.lists = lists;
            }),
        );
        this.Subscription.add(
            this.taskService.selectedList$.subscribe((list) => {
                this.selectedList = list;
            }),
        );
        this.Subscription.add(
            this.calendarService.selectedDate$.subscribe((date) => {
                this.selectedDate = date;
            }),
        );
    }

    addList() {
        this.taskService.addList();
    }
    selectList(list: TTodoList) {
        this.taskService.selectList(list);
    }

    removeList(id: string) {
        this.taskService.removeList(id);
    }

    addNewTask(task: TTaskInput) {
        this.taskService.addNewTask(task);
    }
    sortTasks(event: Event) {
        const target = event.target as HTMLSelectElement;
        const value = target.value as string;
        this.taskService.sortTasks(value as TSort, this.selectedList.sort.asc as boolean);
    }
    checkTask(id: string) {
        this.taskService.checkTask(id);
    }
    isSelected(date: Date): boolean {
        return this.calendarService.isSelected(date);
    }

    deleteTask(task: TTask) {
        this.taskService.deleteTask(task);
    }
    toggleSortOrder() {
        this.taskService.toggleSortOrder();
    }
    ngOnDestroy(): void {
        this.Subscription.unsubscribe();
    } */
}
