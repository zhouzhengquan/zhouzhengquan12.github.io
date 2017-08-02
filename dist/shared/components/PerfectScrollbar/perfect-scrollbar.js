'use strict';
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import { Directive, ElementRef } from '@angular/core';
import * as PS from 'perfect-scrollbar';
var PerfectScrollbar = (function () {
    function PerfectScrollbar(elementRef) {
        this.$element = elementRef.nativeElement;
    }
    PerfectScrollbar.prototype.update = function () {
        PS.update(this.$element);
    };
    PerfectScrollbar.prototype.ngOnInit = function () {
        var _this = this;
        requestAnimationFrame(function () { return PS.initialize(_this.$element, {
            wheelSpeed: 2,
            wheelPropagation: false,
            minScrollbarLength: 20,
            suppressScrollX: true
        }); });
    };
    PerfectScrollbar.prototype.ngOnDestroy = function () {
        PS.destroy(this.$element);
    };
    return PerfectScrollbar;
}());
export { PerfectScrollbar };
PerfectScrollbar.decorators = [
    { type: Directive, args: [{
                selector: '[perfect-scrollbar]'
            },] },
];
/** @nocollapse */
PerfectScrollbar.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
//# sourceMappingURL=perfect-scrollbar.js.map