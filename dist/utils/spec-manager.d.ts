import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SwaggerParameter } from './swagger-typings';
import { OptionsService } from '../services/options.service';
export interface DescendantInfo {
    $ref: string;
    name: string;
    active?: boolean;
    idx?: number;
}
export interface ServerInfo {
    description: string;
    url: string;
}
export declare class SpecManager {
    _schema: any;
    apiUrl: string;
    apiProtocol: string;
    swagger: string;
    basePath: string;
    spec: BehaviorSubject<any>;
    specUrl: string;
    private parser;
    private options;
    constructor(optionsService: OptionsService);
    load(urlOrObject: string | Object): Promise<{}>;
    init(): void;
    preprocess(): void;
    schema: any;
    byPointer(pointer: any): any;
    getAuthHeader(operationPointer: string, authorized: any): string;
    resolveRefs(obj: any): any;
    getOperationParams(operationPtr: string): SwaggerParameter[];
    getTagsMap(): {};
    findDerivedDefinitions(defPointer: string, schema?: any): DescendantInfo[];
    getDescendant(descendant: DescendantInfo, componentSchema: any): any;
    getBaseUrl(hideHostname: boolean): string;
    getServers(hideHostname: boolean): ServerInfo[];
    specWithServer(serverUrl: string): object;
}
