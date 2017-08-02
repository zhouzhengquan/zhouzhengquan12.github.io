import { ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { AppStateService } from '../../services/';
import { NgForm } from '@angular/forms';
export declare class ParamsList extends BaseComponent implements OnInit, OnChanges {
    state: AppStateService;
    pointer: string;
    params: Array<any>;
    empty: boolean;
    bodyParam: any;
    model: any;
    editMode: boolean;
    tryWithForm: NgForm;
    constructor(specMgr: SpecManager, state: AppStateService, cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    prepareModel(): void;
    populateFields(): void;
    init(): void;
    orderParams(params: any): any;
    ngOnInit(): void;
}
