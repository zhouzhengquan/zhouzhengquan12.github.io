'use strict';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent, SpecManager } from '../base';
var ApiLogo = (function (_super) {
    __extends(ApiLogo, _super);
    function ApiLogo(specMgr) {
        var _this = _super.call(this, specMgr) || this;
        _this.logo = {};
        return _this;
    }
    ApiLogo.prototype.init = function () {
        var logoInfo = this.componentSchema.info['x-logo'];
        if (!logoInfo)
            return;
        this.logo.imgUrl = logoInfo.url;
        this.logo.bgColor = logoInfo.backgroundColor || 'transparent';
    };
    ApiLogo.prototype.ngOnInit = function () {
        this.preinit();
    };
    return ApiLogo;
}(BaseComponent));
export { ApiLogo };
ApiLogo.decorators = [
    { type: Component, args: [{
                selector: 'api-logo',
                styles: [':host{display:block;text-align:center}@media (max-width:1000px){:host{display:none}}img{max-height:150px;width:auto;display:inline-block;max-width:100%;box-sizing:border-box}'],
                template: '<img *ngIf="logo.imgUrl" [attr.src]="logo.imgUrl" [ngStyle]="{\'background-color\': logo.bgColor}">',
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ApiLogo.ctorParameters = function () { return [
    { type: SpecManager, },
]; };
//# sourceMappingURL=api-logo.js.map