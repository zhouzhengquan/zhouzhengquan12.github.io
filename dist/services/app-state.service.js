'use strict';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var AppStateService = (function () {
    function AppStateService() {
        this.samplesLanguage = new Subject();
        this.error = new BehaviorSubject(null);
        this.loading = new Subject();
        this.initialized = new BehaviorSubject(false);
        this.rightPanelHidden = new BehaviorSubject(false);
        this.authModalOpened = new BehaviorSubject(false);
        this.searchContainingPointers = new BehaviorSubject([]);
        this.securities = new BehaviorSubject(null);
    }
    AppStateService.prototype.openAuthModal = function (opened) {
        this.authModalOpened.next(opened);
    };
    AppStateService.prototype.startLoading = function () {
        this.loading.next(true);
    };
    AppStateService.prototype.stopLoading = function () {
        this.loading.next(false);
    };
    return AppStateService;
}());
export { AppStateService };
AppStateService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AppStateService.ctorParameters = function () { return []; };
//# sourceMappingURL=app-state.service.js.map