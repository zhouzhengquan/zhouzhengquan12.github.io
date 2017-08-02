'use strict';
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isString, stringify, isBlank } from './helpers';
import JsonPointer from './JsonPointer';
import { MdRenderer } from './';
import { JsonFormatter } from './JsonFormatterPipe';
import { OptionsService } from '../services/options.service';
var BaseException = (function () {
    function BaseException(message) {
        this.message = message;
    }
    return BaseException;
}());
var InvalidPipeArgumentException = (function (_super) {
    __extends(InvalidPipeArgumentException, _super);
    function InvalidPipeArgumentException(type, value) {
        return _super.call(this, "Invalid argument '" + value + "' for pipe '" + stringify(type) + "'") || this;
    }
    return InvalidPipeArgumentException;
}(BaseException));
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value) {
        if (isBlank(value))
            return value;
        if (typeof value !== 'object') {
            throw new InvalidPipeArgumentException(KeysPipe, value);
        }
        return Object.keys(value);
    };
    return KeysPipe;
}());
export { KeysPipe };
KeysPipe.decorators = [
    { type: Pipe, args: [{ name: 'keys' },] },
];
/** @nocollapse */
KeysPipe.ctorParameters = function () { return []; };
var JsonPointerEscapePipe = (function () {
    function JsonPointerEscapePipe() {
    }
    JsonPointerEscapePipe.prototype.transform = function (value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(JsonPointerEscapePipe, value);
        }
        return JsonPointer.escape(value);
    };
    return JsonPointerEscapePipe;
}());
export { JsonPointerEscapePipe };
JsonPointerEscapePipe.decorators = [
    { type: Pipe, args: [{ name: 'jsonPointerEscape' },] },
];
/** @nocollapse */
JsonPointerEscapePipe.ctorParameters = function () { return []; };
var MarkedPipe = (function () {
    function MarkedPipe(sanitizer, optionsService) {
        this.sanitizer = sanitizer;
        this.renderer = new MdRenderer(true);
        this.unstrustedSpec = !!optionsService.options.untrustedSpec;
    }
    MarkedPipe.prototype.transform = function (value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(JsonPointerEscapePipe, value);
        }
        var res = "<span class=\"redoc-markdown-block\">" + this.renderer.renderMd(value) + "</span>";
        return this.unstrustedSpec ? res : this.sanitizer.bypassSecurityTrustHtml(res);
    };
    return MarkedPipe;
}());
export { MarkedPipe };
MarkedPipe.decorators = [
    { type: Pipe, args: [{ name: 'marked' },] },
];
/** @nocollapse */
MarkedPipe.ctorParameters = function () { return [
    { type: DomSanitizer, },
    { type: OptionsService, },
]; };
var SafePipe = (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            return value;
        }
        return this.sanitizer.bypassSecurityTrustHtml(value);
    };
    return SafePipe;
}());
export { SafePipe };
SafePipe.decorators = [
    { type: Pipe, args: [{ name: 'safe' },] },
];
/** @nocollapse */
SafePipe.ctorParameters = function () { return [
    { type: DomSanitizer, },
]; };
var langMap = {
    'c++': 'cpp',
    'c#': 'csharp',
    'objective-c': 'objectivec',
    'shell': 'bash',
    'viml': 'vim'
};
var PrismPipe = (function () {
    function PrismPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    PrismPipe.prototype.transform = function (value, args) {
        if (isBlank(args) || args.length === 0) {
            throw new BaseException('Prism pipe requires one argument');
        }
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(JsonPointerEscapePipe, value);
        }
        var lang = args[0].toString().trim().toLowerCase();
        if (langMap[lang])
            lang = langMap[lang];
        var grammar = Prism.languages[lang];
        //fallback to clike
        if (!grammar)
            grammar = Prism.languages.clike;
        return this.sanitizer.bypassSecurityTrustHtml(Prism.highlight(value, grammar));
    };
    return PrismPipe;
}());
export { PrismPipe };
PrismPipe.decorators = [
    { type: Pipe, args: [{ name: 'prism' },] },
];
/** @nocollapse */
PrismPipe.ctorParameters = function () { return [
    { type: DomSanitizer, },
]; };
var EncodeURIComponentPipe = (function () {
    function EncodeURIComponentPipe() {
    }
    EncodeURIComponentPipe.prototype.transform = function (value) {
        if (isBlank(value))
            return value;
        if (!isString(value)) {
            throw new InvalidPipeArgumentException(EncodeURIComponentPipe, value);
        }
        return encodeURIComponent(value);
    };
    return EncodeURIComponentPipe;
}());
export { EncodeURIComponentPipe };
EncodeURIComponentPipe.decorators = [
    { type: Pipe, args: [{ name: 'encodeURIComponent' },] },
];
/** @nocollapse */
EncodeURIComponentPipe.ctorParameters = function () { return []; };
var COLLECTION_FORMATS = {
    csv: 'Comma Separated',
    ssv: 'Space Separated',
    tsv: 'Tab Separated',
    pipes: 'Pipe Separated'
};
var CollectionFormatPipe = (function () {
    function CollectionFormatPipe() {
    }
    CollectionFormatPipe.prototype.transform = function (param) {
        var format = param.collectionFormat;
        if (!format)
            format = 'csv';
        if (format === 'multi') {
            return 'Multiple ' + param.in + ' params of';
        }
        return COLLECTION_FORMATS[format];
    };
    return CollectionFormatPipe;
}());
export { CollectionFormatPipe };
CollectionFormatPipe.decorators = [
    { type: Pipe, args: [{ name: 'collectionFormat' },] },
];
/** @nocollapse */
CollectionFormatPipe.ctorParameters = function () { return []; };
export var REDOC_PIPES = [
    JsonPointerEscapePipe, MarkedPipe, SafePipe, PrismPipe, EncodeURIComponentPipe, JsonFormatter, KeysPipe, CollectionFormatPipe
];
//# sourceMappingURL=pipes.js.map