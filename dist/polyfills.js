import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/modules/es6.string.starts-with';
import 'core-js/modules/es6.string.ends-with';
import 'core-js/modules/es6.regexp.search';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'core-js/es6/weak-map';
import 'core-js/es6/weak-set';
import 'core-js/es6/typed';
import 'core-js/es6/reflect';
// Typescript emit helpers polyfill
import 'ts-helpers';
if (!IS_PRODUCTION) {
    Error.stackTraceLimit = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
;
if (!Element.prototype.scrollIntoViewIfNeeded) {
    Element.prototype.scrollIntoViewIfNeeded = function (centerIfNeeded) {
        centerIfNeeded = arguments.length === 0 ? true : !!centerIfNeeded;
        var parent = this.parentNode, parentComputedStyle = window.getComputedStyle(parent, null), parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')), parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')), overTop = this.offsetTop - parent.offsetTop < parent.scrollTop, overBottom = (this.offsetTop - parent.offsetTop + this.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight), overLeft = this.offsetLeft - parent.offsetLeft < parent.scrollLeft, overRight = (this.offsetLeft - parent.offsetLeft + this.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth), alignWithTop = overTop && !overBottom;
        if ((overTop || overBottom) && centerIfNeeded) {
            parent.scrollTop = this.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + this.clientHeight / 2;
        }
        if ((overLeft || overRight) && centerIfNeeded) {
            parent.scrollLeft = this.offsetLeft - parent.offsetLeft - parent.clientWidth / 2 - parentBorderLeftWidth + this.clientWidth / 2;
        }
        if ((overTop || overBottom || overLeft || overRight) && !centerIfNeeded) {
            this.scrollIntoView(alignWithTop);
        }
    };
}
//# sourceMappingURL=polyfills.js.map