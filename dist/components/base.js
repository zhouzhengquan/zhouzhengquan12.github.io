'use strict';
import { SpecManager } from '../utils/spec-manager';
export { SpecManager };
/**
 * Generic Component
 * @class
 */
var BaseComponent = (function () {
    function BaseComponent(specMgr) {
        this.specMgr = specMgr;
        this.componentSchema = null;
        this.dereferencedCache = {};
    }
    /**
     * onInit method is run by angular2 after all component inputs are resolved
     */
    BaseComponent.prototype.ngOnInit = function () {
        this.preinit();
    };
    BaseComponent.prototype.preinit = function () {
        this.componentSchema = this.specMgr.byPointer(this.pointer || '');
        this.init();
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    /**
     * Used to initialize component
     * @abstract
     */
    BaseComponent.prototype.init = function () {
        // empty
    };
    /**
     + Used to destroy component
     * @abstract
     */
    BaseComponent.prototype.destroy = function () {
        // emtpy
    };
    return BaseComponent;
}());
export { BaseComponent };
var BaseSearchableComponent = (function (_super) {
    __extends(BaseSearchableComponent, _super);
    function BaseSearchableComponent(specMgr, app) {
        var _this = _super.call(this, specMgr) || this;
        _this.specMgr = specMgr;
        _this.app = app;
        return _this;
    }
    BaseSearchableComponent.prototype.subscribeForSearch = function () {
        var _this = this;
        this.searchSubscription = this.app.searchContainingPointers.subscribe(function (ptrs) {
            for (var i = 0; i < ptrs.length; ++i) {
                if (ptrs[i])
                    _this.ensureSearchIsShown(ptrs[i]);
            }
        });
    };
    BaseSearchableComponent.prototype.preinit = function () {
        _super.prototype.preinit.call(this);
        this.subscribeForSearch();
    };
    BaseSearchableComponent.prototype.ngOnDestroy = function () {
        if (this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
    };
    return BaseSearchableComponent;
}(BaseComponent));
export { BaseSearchableComponent };
//# sourceMappingURL=base.js.map