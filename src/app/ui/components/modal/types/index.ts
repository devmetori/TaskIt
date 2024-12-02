import { EventEmitter } from '@angular/core';

import { MadalFormAction } from '@/app/common/enums';
type ModalSizeProperties = {
    minWidth?: string;
    width?: string;
    maxWidth?: string;
    minHeight?: string;
    height?: string;
    maxHeight?: string;
}
export interface ModelOptions {
    size?: ModalSizeProperties;
    mQueries?: string[];
    props?: { key: string; value: unknown };

}


export type TModalActionEvent = { action: MadalFormAction, data: any }