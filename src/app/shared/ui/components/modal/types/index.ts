import { MadalFormAction } from '@/app/shared/models/enums';

interface ModalSizeProperties {
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

export interface TModalActionEvent {
    action: MadalFormAction;
    data: any;
}
