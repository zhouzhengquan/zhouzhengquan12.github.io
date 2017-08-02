'use strict';
import { Component, ViewChild, ChangeDetectorRef, Input, ChangeDetectionStrategy, } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { SchemaHelper } from '../../services/schema-helper.service';
import { AppStateService } from '../../services/';
import { JsonPointer } from '../../utils/';
function safePush(obj, prop, item) {
    if (!obj[prop])
        obj[prop] = [];
    obj[prop].push(item);
}
var ParamsList = (function (_super) {
    __extends(ParamsList, _super);
    function ParamsList(specMgr, state, cdr) {
        var _this = _super.call(this, specMgr) || this;
        _this.state = state;
        _this.state.securities.subscribe(function (value) {
            _this.populateFields();
            cdr.markForCheck();
        });
        return _this;
    }
    ParamsList.prototype.ngOnChanges = function (changes) {
        var chng = changes['editMode'];
        if (chng && !this.model && chng.currentValue) {
            this.prepareModel();
        }
    };
    ParamsList.prototype.prepareModel = function () {
        this.model = {};
        if (this.bodyParam) {
            var schema = this.bodyParam.schema;
            if (schema.$ref)
                schema = this.specMgr.byPointer(schema.$ref);
            var bodySample = schema['x-redoc-rw-sample'] || schema['x-redoc-ro-sample'];
            this.model.body = (_a = {},
                _a[this.bodyParam.name] = JSON.stringify(bodySample, null, 2),
                _a);
        }
        for (var _i = 0, _b = this.params; _i < _b.length; _i++) {
            var paramType = _b[_i];
            this.model[paramType.place] = {};
            for (var _c = 0, _d = paramType.params; _c < _d.length; _c++) {
                var param = _d[_c];
                var value = param.default ? param.default : (param.enum ? param.enum[0].val : null);
                this.model[paramType.place][param.name] = value;
            }
        }
        this.populateFields();
        var _a;
    };
    ParamsList.prototype.populateFields = function () {
        if (!this.model)
            return;
        var opPointer = JsonPointer.dirName(this.pointer);
        var authorized = this.state.securities.value;
        for (var _i = 0, _a = this.params; _i < _a.length; _i++) {
            var paramType = _a[_i];
            for (var _b = 0, _c = paramType.params; _b < _c.length; _b++) {
                var param = _c[_b];
                if (param['x-example']) {
                    this.model[paramType.place][param.name] = param['x-example'];
                }
                if (param.name.toLowerCase() === 'content-type' && param.in === 'header') {
                    this.model[paramType.place][param.name] = 'application/json';
                }
                if (param.name.toLowerCase() === 'authorization' && param.in === 'header') {
                    param._readOnly = true;
                    param._placeHolder = 'Bearer <TOKEN>';
                    if (authorized) {
                        this.model[paramType.place][param.name] = this.specMgr.getAuthHeader(opPointer, authorized);
                    }
                }
            }
        }
    };
    ParamsList.prototype.init = function () {
        var _this = this;
        this.params = [];
        var paramsList = this.specMgr.getOperationParams(this.pointer);
        paramsList = paramsList.map(function (paramSchema) {
            var propPointer = paramSchema._pointer;
            if (paramSchema.in === 'body')
                return paramSchema;
            return SchemaHelper.preprocess(paramSchema, propPointer, _this.pointer);
        });
        var paramsMap = this.orderParams(paramsList);
        if (paramsMap.body && paramsMap.body.length) {
            var bodyParam = paramsMap.body[0];
            this.bodyParam = bodyParam;
            paramsMap.body = undefined;
        }
        this.empty = !(Object.keys(paramsMap).length || this.bodyParam);
        var paramsPlaces = ['path', 'query', 'formData', 'header', 'body'];
        var placeHint = {
            path: "Used together with Path Templating, where the parameter value is actually part\n        of the operation's URL. This does not include the host or base path of the API.\n        For example, in /items/{itemId}, the path parameter is itemId",
            query: "Parameters that are appended to the URL.\n        For example, in /items?id=###, the query parameter is id",
            formData: "Parameters that are submitted through a form.\n        application/x-www-form-urlencoded, multipart/form-data or both are usually\n        used as the content type of the request",
            header: 'Custom headers that are expected as part of the request'
        };
        var params = [];
        paramsPlaces.forEach(function (place) {
            if (paramsMap[place] && paramsMap[place].length) {
                params.push({ place: place, placeHint: placeHint[place], params: paramsMap[place] });
            }
        });
        this.params = params;
    };
    ParamsList.prototype.orderParams = function (params) {
        var res = {};
        params.forEach(function (param) { return safePush(res, param.in, param); });
        return res;
    };
    ParamsList.prototype.ngOnInit = function () {
        this.preinit();
    };
    return ParamsList;
}(BaseComponent));
export { ParamsList };
ParamsList.decorators = [
    { type: Component, args: [{
                selector: 'params-list',
                template: '<h5 class="param-list-header" *ngIf="params.length">Parameters</h5><form #tryWithForm="ngForm"><ng-template ngFor [ngForOf]="params" let-paramType="$implicit"><header class="paramType">{{paramType.place}} Parameters <span class="hint--top-right hint--large" [attr.data-hint]="paramType.placeHint">?</span></header><div class="params-wrap"><div *ngFor="let param of paramType.params" class="param"><div class="param-name"><span class="param-name-wrap">{{param.name}}</span></div><div class="param-info"><div class="param-info-flexwrap"><div class="param-info-column"><div><span *ngIf=\'param.type === "array"\' class="param-array-format param-collection-format-{{param.collectionFormat}}">{{param | collectionFormat}} </span><span class="param-type {{param.type}}" [ngClass]="{\'with-hint\': param._displayTypeHint}" title="{{param._displayTypeHint}}">{{param._displayType}} {{param._displayFormat}}</span> <span class="param-range" *ngIf="param._range">{{param._range}} </span><span *ngIf="param.required" class="param-required">Required</span><div class="param-default" *ngIf="param.default != null"><span class="param-default-value">{{param.default | json}}</span></div><div *ngIf="param.enum" class="param-enum"><span *ngFor="let enumItem of param.enum" class="param-enum-value {{enumItem.type}}">{{enumItem.val | json}}</span></div><span *ngIf="param.pattern" class="param-pattern">{{param.pattern}}</span></div><div class="param-description" [innerHtml]="param.description | marked"></div></div><div class="edit-mode-control" *ngIf="editMode"><ng-template [ngIf]="!param.enum"><input [readonly]="param._readOnly" [placeholder]="param._placeHolder || \'\'" [type]="param.inputType" #fieldModel="ngModel" name="{{param.name}}" [validateSchema]="param" [(ngModel)]="model[paramType.place][param.name]"><div *ngIf="fieldModel.errors?.validateSchema && fieldModel.touched" class="error-message">{{fieldModel.errors.validateSchema.message}}</div></ng-template><ng-template [ngIf]="param.enum"><select #fieldModel="ngModel" name="{{param.name}}" [(ngModel)]="model[paramType.place][param.name]"><option *ngFor="let item of param.enum" [value]="item.val">{{item.val}}</option></select><div *ngIf="fieldModel.errors?.validateSchema && fieldModel.touched" class="error-message">{{fieldModel.errors.validateSchema.message}}</div></ng-template></div></div></div></div></div></ng-template><div *ngIf="bodyParam"><h5 class="param-list-header" *ngIf="bodyParam">Request Body</h5><div class="body-param-description" [innerHtml]="bodyParam.description | marked"></div><div><br><json-schema-lazy *ngIf="!editMode" [isRequestSchema]="true" [auto]="true" pointer="{{bodyParam._pointer}}/schema"></json-schema-lazy><div *ngIf="editMode"><codeflask #fieldModel="ngModel" [validateSchema]="bodyParam.schema" name="{{bodyParam.name}}" [(ngModel)]="model.body[bodyParam.name]"></codeflask><div *ngIf="fieldModel.errors?.validateSchema && fieldModel.touched" class="error-message">{{fieldModel.errors.validateSchema.message}}</div></div></div></div></form>',
                styles: ['.param-info,.param-name,input{box-sizing:border-box}:host{display:block}.param-name-wrap,.param-type-trivial,.param-type.with-hint{display:inline-block}.param-list-header{border-bottom:1px solid rgba(21,31,38,.2);margin:3em 0 1em;color:rgba(21,31,38,.5);font-weight:400;text-transform:uppercase}.param-nullable,.param-required{font-size:12px;font-weight:700;vertical-align:middle}.param-name-wrap{padding-right:25px;font-family:Montserrat,sans-serif}.param-info{border-bottom:1px solid #d9d9d9;padding:10px 0}.param-info>div{line-height:1}.param-range{position:relative;top:1px;margin-right:6px;margin-left:6px;border-radius:2px;background-color:rgba(0,51,160,.1);padding:0 4px;color:rgba(0,51,160,.7)}.param-required{line-height:20px;color:#e53935}.param-nullable{line-height:20px;color:#3195a6}.param-array-format,.param-type{vertical-align:middle;line-height:20px;color:rgba(21,31,38,.4);font-size:.929em}.param-type{font-weight:400;word-break:break-all}.param-type.array::before,.param-type.tuple::before{color:#151f26;font-weight:300}.param-collection-format-multi+.param-type.array::before,.param-collection-format-multi+.param-type.tuple::before{content:none}.param-type.array::before{content:"Array of "}.param-type.tuple::before{content:"Tuple "}.param-type.with-hint{margin-bottom:.4em;border-bottom:1px dotted rgba(38,50,56,.4);padding:0;cursor:help}.param-type-file{font-weight:700;text-transform:capitalize}.param-name{border-left:1px solid rgba(0,51,160,.5);position:relative;padding:10px 0;line-height:20px;white-space:nowrap;font-size:.929em;font-weight:400}.param-name>span::before{content:\'\';display:inline-block;width:1px;height:7px;background-color:#0033a0;margin:0 10px;vertical-align:middle}.param-name>span::after{content:\'\';position:absolute;border-top:1px solid rgba(0,51,160,.5);width:10px;left:0;top:21px}.param:first-of-type>.param-name::before{content:\'\';display:block;position:absolute;left:-1px;top:0;border-left:2px solid #fff;height:21px}.param.last>.param-name,.param:last-of-type>.param-name{position:relative}.param.last>.param-name::after,.param:last-of-type>.param-name::after{content:\'\';display:block;position:absolute;left:-2px;border-left:2px solid #fff;top:22px;background-color:#fff;bottom:0}.param-wrap:last-of-type>.param-schema{border-left-color:transparent}.param-schema .param-wrap:first-of-type .param-name::before{display:none}.param-schema.last>td{border-left:0}.param-enum{color:#151f26;font-size:.95em}.param-enum::before{content:\'Valid values: \'}.param-type.array~.param-enum::before{content:\'Valid items values: \'}.param-pattern{color:#3195a6;white-space:nowrap}.param-pattern::after,.param-pattern::before{content:\'/\';margin:0 3px;font-size:1.2em;font-weight:700}.param-default{font-size:.95em}.param-default::before{content:\'Default: \'}.param-default-value,.param-enum-value{background-color:#fff;border:1px solid rgba(38,50,56,.2);margin:2px 3px;padding:0 5px;border-radius:2px;color:#263238;display:inline-block;min-width:20px;text-align:center}header.paramType{margin:25px 0 5px;text-transform:capitalize}.param-array-format{color:#000;font-weight:300}.params-wrap{display:table;width:100%}.param-name{display:table-cell;vertical-align:top}.param-info{display:table-cell;width:100%}.param{display:table-row}.param:first-of-type .param-name:after,.param:last-of-type>.param-name:after{content:"";display:block;position:absolute;background-color:#fff;top:0}.param:last-of-type>.param-name{border-left:0}.param:last-of-type>.param-name:after{left:0;border-left:1px solid rgba(0,51,160,.5);height:21px}.param:first-of-type .param-name:after{left:-1px;border-left:2px solid #fff;height:20px}[data-hint]{width:1.2em;text-align:center;border-radius:50%;vertical-align:middle;color:#999;line-height:1.2;text-transform:none;cursor:help;border:1px solid #999;margin-left:.5em}@media (max-width:520px){[data-hint]{float:right}[data-hint]:after{margin-left:12px;transform:translateX(-100%) translateY(-8px);-moz-transform:translateX(-100%) translateY(-8px);-webkit-transform:translateX(-100%) translateY(-8px)}}.param-info-flexwrap{display:flex;justify-content:space-between}.edit-mode-control{padding-left:30px}.error-message{margin-top:5px;font-size:12px;color:#e53935}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-3px,0,0)}40%,60%{transform:translate3d(3px,0,0)}}input{border:1px solid #d9d9d9;border-radius:2px;padding:8px 10px;width:150px;max-width:100%;font-size:14px;outline:0}input:focus{border:1px solid #5FC9CF}input[readonly]{background:#f0f1f1;cursor:not-allowed;border:1px solid #d9d9d9}codeflask.ng-invalid.ng-touched,input.ng-invalid.ng-touched{border:1px solid red;animation:shake .68s cubic-bezier(.36,.07,.19,.97) both}'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ParamsList.ctorParameters = function () { return [
    { type: SpecManager, },
    { type: AppStateService, },
    { type: ChangeDetectorRef, },
]; };
ParamsList.propDecorators = {
    'pointer': [{ type: Input },],
    'editMode': [{ type: Input },],
    'tryWithForm': [{ type: ViewChild, args: ['tryWithForm',] },],
};
//# sourceMappingURL=params-list.js.map