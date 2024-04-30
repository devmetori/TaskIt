import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { defaultList } from '../common/data';
import { TTodoList, TDefaultValue } from '../common/types';

@Injectable({
    providedIn: 'root',
})
export class StoreService {
    readonly defaultValue: TDefaultValue = this.getInitialValue();

    private _lists = new BehaviorSubject<TTodoList[]>([]);
    private _selectedList = new BehaviorSubject<TTodoList>({} as TTodoList);

    readonly lists$ = this._lists.asObservable();
    readonly selectedList$ = this._selectedList.asObservable();

    constructor() {
        this._lists.next(this.defaultValue.lists);
        this._selectedList.next(this.defaultValue.selectedList);
    }

    private getInitialValue(): TDefaultValue {
        const lists = this.getItem<TTodoList[]>('lists') as TTodoList[];
        const selectedList = this.getItem<TTodoList>('selectedList');
        // Si no hay listas en el local storage, se crean las listas por defecto
        if (!Array.isArray(lists) && !lists) {
            this.setItem('lists', [defaultList]);
            this.setItem('selectedList', defaultList);
            return { lists: [defaultList], selectedList: defaultList };
        }

        // Si no hay lista seleccionada en el local storage, se selecciona la primera lista
        if (!selectedList && Array.isArray(lists) && lists?.length > 0) {
            this.setItem('selectedList', lists[0]);
            return { lists, selectedList: lists[0] };
        }

        // Si hay listas en el local storage,  pero no datos a la lista
        if (Array.isArray(lists) && lists.length <= 0) {
            const newList = [defaultList] as TTodoList[];
            this.setItem('selectedList', newList[0]);
            this.setItem('lists', newList);
            return { lists: newList, selectedList: newList[0] };
        }

        return { lists: lists, selectedList: selectedList as TTodoList };
    }

    public updateLists(lists: TTodoList[]): void {
        this._lists.next(lists);
        this.setItem('lists', this._lists.getValue());
    }

    public updateSelectedList(selectedList: TTodoList): void {
        this._selectedList.next(selectedList);
        this.setItem('selectedList', selectedList);
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
