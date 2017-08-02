import { FormControl } from '@angular/forms';
import { SpecManager } from '../base';
export declare class SchemaValidator {
    private spec;
    validateSchema: any;
    validator: any;
    constructor(spec: SpecManager);
    validate(c: FormControl): {
        validateSchema: {
            valid: any;
            message: any;
        };
    };
}
