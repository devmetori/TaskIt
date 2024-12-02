import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    constructor() {
    }

    setItem(key: string, value: any): void {
        try {
            const jsonValue = JSON.stringify(value);
            localStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error('Error guardando datos en el localStorage', error);
        }
    }

    getItem<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error obteniendo datos del localStorage', error);
            return null;
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
