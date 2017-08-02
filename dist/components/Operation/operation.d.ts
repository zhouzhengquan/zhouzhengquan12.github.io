import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { OptionsService, MenuService, AppStateService } from '../../services/';
import { SwaggerBodyParameter } from '../../utils/swagger-typings';
import { ParamsList } from '../ParamsList/params-list';
import { SwaggerOperation } from '../../utils/swagger-typings';
import { ServerInfo } from '../../utils/spec-manager';
export interface OperationInfo {
    verb: string;
    path: string;
    info: {
        tags: string[];
        description: string;
    };
    bodyParam: any;
    summary: string;
    anchor: string;
    externalDocs?: {
        url: string;
        description?: string;
    };
}
export declare class TryWithResponse {
    statusCode: number;
    status: string;
    type: string;
    body: Object;
    text: string;
    headers: {
        name: string;
        value: string;
    }[];
    constructor(response: any, spec: SwaggerOperation);
}
export declare class Operation extends BaseComponent implements OnInit {
    appState: AppStateService;
    private optionsService;
    private cdr;
    private menu;
    pointer: string;
    parentTagId: string;
    operationId: any;
    paramsList: ParamsList;
    editMode: boolean;
    operation: OperationInfo;
    pathInMiddlePanel: boolean;
    model: any;
    tryWithResponse: TryWithResponse;
    tryWithInProgress: boolean;
    tryWithResponseError: string;
    servers: ServerInfo[];
    activeServerUrl: string;
    constructor(specMgr: SpecManager, appState: AppStateService, optionsService: OptionsService, cdr: ChangeDetectorRef, menu: MenuService);
    toggleEditMode(): void;
    clear(): void;
    execute(): void;
    openAuthModal(): void;
    init(): void;
    buildAnchor(): string;
    filterMainTags(tags: any): any;
    findBodyParam(): SwaggerBodyParameter;
    ngOnInit(): void;
}
