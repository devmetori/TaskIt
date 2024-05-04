import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaskFormComponent } from './newtask-form.component';

describe('NewtaskFormComponent', () => {
    let component: NewtaskFormComponent;
    let fixture: ComponentFixture<NewtaskFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NewtaskFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NewtaskFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
