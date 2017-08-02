'use strict';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
var ExternalDocs = (function () {
    function ExternalDocs() {
    }
    ExternalDocs.prototype.ngOnInit = function () {
        if (this.docs && !this.docs.description) {
            this.docs.description = 'External Docs';
        }
    };
    return ExternalDocs;
}());
export { ExternalDocs };
ExternalDocs.decorators = [
    { type: Component, args: [{
                selector: 'redoc-externalDocs',
                template: "<a *ngIf=\"docs\" [href]=\"docs.url\" [innerHtml]=\"docs.description | marked\"></a>",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
ExternalDocs.ctorParameters = function () { return []; };
ExternalDocs.propDecorators = {
    'docs': [{ type: Input },],
};
//# sourceMappingURL=external-docs.js.map