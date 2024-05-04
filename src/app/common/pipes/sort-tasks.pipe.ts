import { Pipe, PipeTransform } from '@angular/core';
import { TTask, TSort } from '@/app/common/types';

@Pipe({
    name: 'sortTasks',
    pure: true,
    standalone: true,
})
export class SortTasksPipe implements PipeTransform {
    private cachedData: TTask[] = [];
    private cachedResult: TTask[] = [];
    private cachedSortKey: TSort | null = null;
    private cachedAsc: boolean = true;

    transform(tasks: TTask[], sortKey: TSort, asc: boolean = true): TTask[] {
        if (!tasks) return [];

        if (this.isCacheValid(tasks, sortKey, asc)) {
            return this.cachedResult;
        }

        const result = tasks.sort(this.getComparator(sortKey, asc));

        this.cachedData = [...tasks];
        this.cachedResult = result;
        this.cachedSortKey = sortKey;
        this.cachedAsc = asc;

        return result;
    }

    private isCacheValid(tasks: TTask[], sortKey: TSort, asc: boolean): boolean {
        return (
            Array.isArray(this.cachedData) &&
            this.cachedData.length === tasks.length &&
            this.cachedData.every((task, index) => task === tasks[index]) &&
            this.cachedSortKey === sortKey &&
            this.cachedAsc === asc
        );
    }

    private getComparator(sortKey: TSort, asc: boolean): (a: TTask, b: TTask) => number {
        return (a, b) => {
            let comparison = 0;
            switch (sortKey) {
                case 'description':
                    comparison = this.safeCompare(a.description, b.description);
                    break;
                case 'date':
                    comparison = +new Date(a.dateStart) - +new Date(b.dateStart);
                    break;
                case 'priority':
                    comparison = (a.priority || 0) - (b.priority || 0);
                    break;
                case 'status':
                    comparison = +a.completed - +b.completed;
                    break;
                default:
                    throw new Error('Unrecognized sort key');
            }
            return asc ? comparison : -comparison;
        };
    }

    private safeCompare(a: any, b: any): number {
        if (a == null && b == null) return 0;
        if (a == null) return -1;
        if (b == null) return 1;
        return a.localeCompare(b);
    }
}
