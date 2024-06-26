import { EventEmitter } from '@angular/core';

export interface ModelOptions {
    size?: {
        minWidth?: string;
        width?: string;
        maxWidth?: string;
        minHeight?: string;
        height?: string;
        maxHeight?: string;
    };
    mQueries?: string[];
    props?: { key: string; value: unknown };
}

export type TOnFinish = {
    OnFinish: EventEmitter<void>;
};
