import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
    let service: StoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StoreService],
        });
        service = TestBed.inject(StoreService);
    });

    it('Debería crear el servicio', () => {
        expect(service).toBeTruthy();
    });
});
