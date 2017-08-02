import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import { ElementRef, OnInit, OnDestroy } from '@angular/core';
export declare class PerfectScrollbar implements OnInit, OnDestroy {
    $element: any;
    subscription: any;
    constructor(elementRef: ElementRef);
    update(): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
