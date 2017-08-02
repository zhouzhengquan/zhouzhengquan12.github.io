import { ErrorHandler, Injectable } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
var CustomErrorHandler = (function (_super) {
    __extends(CustomErrorHandler, _super);
    function CustomErrorHandler(appState) {
        var _this = _super.call(this) || this;
        _this.appState = appState;
        return _this;
    }
    CustomErrorHandler.prototype.handleError = function (error) {
        this.appState.error.next(error && error.rejection || error);
        _super.prototype.handleError.call(this, error);
    };
    return CustomErrorHandler;
}(ErrorHandler));
export { CustomErrorHandler };
CustomErrorHandler.decorators = [
    { type: Injectable },
];
/** @nocollapse */
CustomErrorHandler.ctorParameters = function () { return [
    { type: AppStateService, },
]; };
//# sourceMappingURL=custom-error-handler.js.map