import { OnInit, ElementRef } from '@angular/core';
import { SpecManager, BaseComponent } from '../base';
import { OptionsService, Marker } from '../../services/index';
export declare class ApiInfo extends BaseComponent implements OnInit {
    private optionsService;
    info: any;
    specUrl: String;
    constructor(specMgr: SpecManager, optionsService: OptionsService, elRef: ElementRef, marker: Marker);
    init(): void;
    ngOnInit(): void;
}
