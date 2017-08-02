import { EventEmitter, AfterViewInit } from '@angular/core';
/**
 * CodeFlask component
 * Usage :
 * <codeflask [(ngModel)]="data"></codeflask>
 */
export declare class CodeflaskComponent implements AfterViewInit {
    change: EventEmitter<{}>;
    host: any;
    instance: any;
    _value: string;
    value: string;
    /**
     * On component destroy
     */
    ngAfterViewInit(): void;
    /**
     * Initialize codemirror
     */
    codeflaskInit(): void;
    /**
     * Value update process
     */
    updateValue(value: any): void;
    writeValue(value: any): void;
    onChange(_: any): void;
    onTouched(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
