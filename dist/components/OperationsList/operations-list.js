'use strict';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
import { MenuService } from '../../services/index';
var OperationsList = (function (_super) {
    __extends(OperationsList, _super);
    function OperationsList(specMgr, menu) {
        var _this = _super.call(this, specMgr) || this;
        _this.menu = menu;
        _this.tags = [];
        return _this;
    }
    OperationsList.prototype.init = function () {
        var _this = this;
        var flatMenuItems = this.menu.flatItems;
        this.tags = [];
        var emptyTag = {
            name: '',
            items: []
        };
        flatMenuItems.forEach(function (menuItem) {
            // skip items that are not bound to swagger tags/operations
            if (!menuItem.metadata)
                return;
            if (menuItem.metadata.type === 'tag') {
                _this.tags.push(__assign({}, menuItem, { anchor: _this.buildAnchor(menuItem.id) }));
            }
            if (menuItem.metadata.type === 'operation' && !menuItem.parent) {
                emptyTag.items.push(menuItem);
            }
        });
        if (emptyTag.items.length)
            this.tags.push(emptyTag);
    };
    OperationsList.prototype.buildAnchor = function (tagId) {
        return this.menu.hashFor(tagId, { type: 'tag' });
    };
    OperationsList.prototype.trackByTagName = function (_, el) {
        return el.name;
    };
    OperationsList.prototype.ngOnInit = function () {
        this.preinit();
    };
    return OperationsList;
}(BaseComponent));
export { OperationsList };
OperationsList.decorators = [
    { type: Component, args: [{
                selector: 'operations-list',
                template: '<div class="operations"><div class="tag" *ngFor="let tag of tags; trackBy:trackByTagName" [attr.section]="tag.id"><div class="tag-info" *ngIf="tag.name"><h1 class="sharable-header"><a class="share-link" href="#{{tag.anchor}}"></a>{{tag.name}}</h1><p *ngIf="tag.description" [innerHtml]="tag.description | marked"></p><redoc-externalDocs [docs]="tag.metadata.externalDocs"></redoc-externalDocs></div><operation *lazyFor="let operation of tag.items; let ready = ready;" [hidden]="!ready" [pointer]="operation.metadata.pointer" [parentTagId]="tag.id" [attr.section]="operation.id"></operation></div></div>',
                styles: [':host{display:block;overflow:hidden}:host [hidden]{display:none}.tag-info{padding:40px;box-sizing:border-box;width:60%}@media (max-width:1100px){.tag-info{width:100%}}.tag-info:after,.tag-info:before{content:"";display:table}.tag-info h1{color:#0033a0;text-transform:capitalize;font-weight:400;margin-top:0}.operations{display:block;position:relative}'],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
OperationsList.ctorParameters = function () { return [
    { type: SpecManager, },
    { type: MenuService, },
]; };
OperationsList.propDecorators = {
    'pointer': [{ type: Input },],
};
//# sourceMappingURL=operations-list.js.map