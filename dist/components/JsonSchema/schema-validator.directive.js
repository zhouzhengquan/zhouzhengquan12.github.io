import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';
import { SpecManager } from '../base';
import * as ZSchema from 'z-schema';
var SchemaValidator = (function () {
    function SchemaValidator(spec) {
        this.spec = spec;
        this.validator = new ZSchema({
            ignoreUnknownFormats: true
        });
    }
    SchemaValidator.prototype.validate = function (c) {
        var schema = __assign({}, this.validateSchema);
        if (schema.$ref) {
            schema = __assign({}, this.spec.byPointer(schema.$ref));
        }
        if (schema.required && (c.value == null || c.value === '')) {
            return {
                validateSchema: {
                    valid: false,
                    message: 'field is required'
                }
            };
        }
        if (schema.in)
            delete schema.required;
        var value = c.value;
        if (value === '' || value == null)
            return null;
        if (schema.type === 'number') {
            if (value === '' || value == null)
                return null;
            value = isFinite(value) && parseFloat(value);
            if (isNaN(value) || value === false) {
                return {
                    validateSchema: {
                        valid: false,
                        message: 'number expected'
                    }
                };
            }
        }
        if (schema.type === 'integer') {
            if (value === '' || value == null)
                return null;
            value = isFinite(value) && parseFloat(value);
            if (isNaN(value) || value === false || value !== Math.trunc(value)) {
                return {
                    validateSchema: {
                        valid: false,
                        message: 'integer expected'
                    }
                };
            }
        }
        if (schema.type === 'object' || schema.type === 'array') {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                return {
                    validateSchema: {
                        valid: false,
                        message: e.message
                    }
                };
            }
        }
        if (value == null)
            value = '';
        schema.definitions = this.spec._schema.definitions || {};
        var valid = this.validator.validate(value, schema);
        var error = this.validator.getLastError();
        var message = error && error.details[0].message;
        if (schema.type === 'object' && error) {
            var fieldPath = error.details[0].path.replace('#/', '').replace(/\//g, '.');
            if (fieldPath) {
                message = fieldPath + ": " + message;
            }
        }
        return valid ? null : {
            validateSchema: {
                valid: valid,
                message: message
            }
        };
    };
    return SchemaValidator;
}());
export { SchemaValidator };
SchemaValidator.decorators = [
    { type: Directive, args: [{
                selector: '[validateSchema][ngModel],[validateSchema][formControl]',
                providers: [
                    { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return SchemaValidator; }), multi: true }
                ]
            },] },
];
/** @nocollapse */
SchemaValidator.ctorParameters = function () { return [
    { type: SpecManager, },
]; };
SchemaValidator.propDecorators = {
    'validateSchema': [{ type: Input },],
};
//# sourceMappingURL=schema-validator.directive.js.map