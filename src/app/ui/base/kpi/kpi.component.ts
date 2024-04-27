import { Component, Input } from '@angular/core';
import { TSimpleKpi } from '../../../common/types';

@Component({
    selector: 'app-kpi',
    standalone: true,
    imports: [],
    templateUrl: './kpi.component.html',
    styleUrl: './kpi.component.scss',
})
export class KpiComponent {
    @Input() KPI: TSimpleKpi = {} as TSimpleKpi;
    @Input() title: string = '';
}
