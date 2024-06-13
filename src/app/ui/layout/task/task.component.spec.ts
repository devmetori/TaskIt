import { ComponentFixture, TestBed } from '@angular/core/testing';

import '@/app/test/mock/matchMedia.mock';
import { globalProviders } from '@/app/test/setup.spect';
import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskComponent],
            providers: globalProviders,
        }).compileComponents();

        fixture = TestBed.createComponent(TaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Se debe crear el componente', () => {
        expect(component).toBeTruthy();
    });
});
