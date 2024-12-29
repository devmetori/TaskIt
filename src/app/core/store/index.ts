import { computed, signal, Signal } from '@angular/core';

export class Store<TState> {
    protected readonly state = signal({} as TState);

    constructor(initialState: TState) {
        this.state.set(initialState);
    }

    public SelectSingle<K extends keyof TState>(key: K): Signal<TState[K]> {
        return computed(() => this.state()[key]);
    }

    public Select<S>(selector: (state: TState) => S): Signal<S> {
        return computed(() => selector(this.state()));
    }

    public FillState(data: TState) {
        this.state.set(data);
    }

    public Set<K extends keyof TState>(key: K, data: TState[K]) {
        this.state.update((currentValue) => ({ ...currentValue, [key]: data }));
    }

    public setState(partialState: Partial<TState>): void {
        this.state.update((currentValue) => ({ ...currentValue, ...partialState }));
    }
}
