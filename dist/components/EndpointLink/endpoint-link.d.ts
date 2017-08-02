import { OnInit } from '@angular/core';
import { SpecManager } from '../base';
import { ServerInfo } from '../../utils/spec-manager';
import { OptionsService } from '../../services/';
export declare class EndpointLink implements OnInit {
    specMgr: SpecManager;
    optionsService: OptionsService;
    path: string;
    verb: string;
    apiUrl: string;
    servers: ServerInfo[];
    expanded: boolean;
    handleClick(): void;
    constructor(specMgr: SpecManager, optionsService: OptionsService);
    init(): void;
    ngOnInit(): void;
}
