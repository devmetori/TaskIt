import { Component, ElementRef, ViewChild, AfterViewInit, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalService } from './modal.service';
import { ModelOptions } from './types';

@Component({
    standalone: true,
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterViewInit {
    @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
    @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
    options!: ModelOptions | undefined;

    constructor(
        private modalService: ModalService,
        private element: ElementRef,
    ) {}

    @HostListener('document:keydown.escape')
    onEscape() {
        this.onClose();
    }

    onClose() {
        this.modalService.close();
    }

    ngAfterViewInit() {
        this.options = this.modalService.options;
        this.addOptions();
    }

    addOptions() {
        this.modal.nativeElement.style.minWidth = this.options?.size?.minWidth || 'auto';
        this.modal.nativeElement.style.width = this.options?.size?.width || 'auto';
        this.modal.nativeElement.style.maxWidth = this.options?.size?.maxWidth || 'auto';
        this.modal.nativeElement.style.minHeight = this.options?.size?.minHeight || 'auto';
        this.modal.nativeElement.style.height = this.options?.size?.height || 'auto';
        this.modal.nativeElement.style.maxHeight = this.options?.size?.maxHeight || 'auto';
    }

    close() {
        if (this.element.nativeElement) {
            this.modalService.options = undefined;
            this.element.nativeElement.remove();
        }
    }
}
