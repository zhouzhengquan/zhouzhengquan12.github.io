// Imports
import { Component, Input, Output, ViewChild, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var CodeFlask = require('exports-loader?CodeFlask=CodeFlask!codeflask/src/codeflask.js').CodeFlask;
/**
 * CodeFlask component
 * Usage :
 * <codeflask [(ngModel)]="data"></codeflask>
 */
var CodeflaskComponent = (function () {
    function CodeflaskComponent() {
        this.change = new EventEmitter();
        this.instance = null;
        this._value = '';
    }
    Object.defineProperty(CodeflaskComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * On component destroy
     */
    // ngOnDestroy(){
    //
    // }
    CodeflaskComponent.prototype.ngAfterViewInit = function () {
        this.codeflaskInit();
    };
    /**
     * Initialize codemirror
     */
    CodeflaskComponent.prototype.codeflaskInit = function () {
        var _this = this;
        this.instance = new CodeFlask();
        this.instance.scaffold(this.host.nativeElement, false, { language: 'javascript' });
        this.instance.onUpdate(function (value) { return _this.updateValue(value); });
    };
    /**
     * Value update process
     */
    CodeflaskComponent.prototype.updateValue = function (value) {
        this.value = value;
        this.change.emit(value);
    };
    CodeflaskComponent.prototype.writeValue = function (value) {
        this._value = value || '';
        if (this.instance) {
            this.instance.update(this._value);
        }
    };
    CodeflaskComponent.prototype.onChange = function (_) {
        /* nope */
    };
    CodeflaskComponent.prototype.onTouched = function () {
        /* nope */
    };
    CodeflaskComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CodeflaskComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CodeflaskComponent;
}());
export { CodeflaskComponent };
CodeflaskComponent.decorators = [
    { type: Component, args: [{
                selector: 'codeflask',
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return CodeflaskComponent; }),
                        multi: true
                    }
                ],
                template: "<div #host></div>",
                styles: [':host{border:1px solid #ccc;display:block}.CodeFlask{min-height:300px}:host /deep/ .CodeFlask__pre{box-shadow:none;border:0}:host /deep/ code[class*=language-],:host /deep/ pre[class*=language-]{color:#444;text-shadow:0 1px #fff}:host /deep/ code[class*=language-] ::-moz-selection,:host /deep/ code[class*=language-]::-moz-selection,:host /deep/ pre[class*=language-] ::-moz-selection,:host /deep/ pre[class*=language-]::-moz-selection{text-shadow:none;background:#b3d4fc}:host /deep/ code[class*=language-] ::selection,:host /deep/ code[class*=language-]::selection,:host /deep/ pre[class*=language-] ::selection,:host /deep/ pre[class*=language-]::selection{text-shadow:none;background:#b3d4fc}@media print{:host /deep/ code[class*=language-],:host /deep/ pre[class*=language-]{text-shadow:none}}:host /deep/ pre[class*=language-]{padding:1em;margin:.5em 0;overflow:auto}:host /deep/ :not(pre)>code[class*=language-],:host /deep/ pre[class*=language-]{background:#f5f2f0}:host /deep/ .token.cdata,:host /deep/ .token.comment,:host /deep/ .token.doctype,:host /deep/ .token.prolog{color:#708090}:host /deep/ .token.punctuation{color:#999}:host /deep/ .token.boolean,:host /deep/ .token.constant,:host /deep/ .token.deleted,:host /deep/ .token.number,:host /deep/ .token.property,:host /deep/ .token.symbol,:host /deep/ .token.tag{color:#905}:host /deep/ .token.attr-name,:host /deep/ .token.builtin,:host /deep/ .token.char,:host /deep/ .token.inserted,:host /deep/ .token.selector,:host /deep/ .token.string{color:#0fb120}:host /deep/ .language-css .token.string,:host /deep/ .style .token.string,:host /deep/ .token.entity,:host /deep/ .token.operator,:host /deep/ .token.url{color:#a67f59;background:rgba(255,255,255,.5)}:host /deep/ .token.atrule,:host /deep/ .token.attr-value,:host /deep/ .token.keyword{color:#07a}:host /deep/ .token.function{color:#DD4A68}:host /deep/ .token.important,:host /deep/ .token.regex,:host /deep/ .token.variable{color:#e90}']
            },] },
];
/** @nocollapse */
CodeflaskComponent.ctorParameters = function () { return []; };
CodeflaskComponent.propDecorators = {
    'change': [{ type: Output },],
    'host': [{ type: ViewChild, args: ['host',] },],
    'instance': [{ type: Output },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=code-flask.component.js.map