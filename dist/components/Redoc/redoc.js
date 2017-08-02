'use strict';
import { ElementRef, ChangeDetectorRef, Input, Component, HostBinding } from '@angular/core';
import { BaseComponent } from '../base';
import * as detectScollParent from 'scrollparent';
import { SpecManager } from '../../utils/spec-manager';
import { SearchService, OptionsService, Hash, AppStateService, SchemaHelper, MenuService, Marker } from '../../services/';
import { LazyTasksService } from '../../shared/components/LazyFor/lazy-for';
var Redoc = (function (_super) {
    __extends(Redoc, _super);
    function Redoc(specMgr, optionsMgr, elementRef, changeDetector, appState, lazyTasksService, hash) {
        var _this = _super.call(this, specMgr) || this;
        _this.changeDetector = changeDetector;
        _this.appState = appState;
        _this.lazyTasksService = lazyTasksService;
        _this.hash = hash;
        _this.specLoading = false;
        _this.specLoadingRemove = false;
        _this.panelHidden = false;
        SchemaHelper.setSpecManager(specMgr);
        // merge options passed before init
        optionsMgr.options = Redoc._preOptions || {};
        _this.element = elementRef.nativeElement;
        _this.$parent = _this.element.parentElement;
        _this.$refElem = _this.element.nextElementSibling;
        //parse options (top level component doesn't support inputs)
        optionsMgr.parseOptions(_this.element);
        var scrollParent = detectScollParent(_this.element);
        if (scrollParent === (document.scrollingElement || document.documentElement))
            scrollParent = window;
        optionsMgr.options.$scrollParent = scrollParent;
        _this.options = optionsMgr.options;
        _this.lazyTasksService.allSync = !_this.options.lazyRendering;
        return _this;
    }
    Redoc.prototype.hideLoadingAnimation = function () {
        var _this = this;
        requestAnimationFrame(function () {
            _this.specLoadingRemove = true;
            setTimeout(function () {
                _this.specLoadingRemove = false;
                _this.specLoading = false;
            }, 400);
        });
    };
    Redoc.prototype.showLoadingAnimation = function () {
        this.specLoading = true;
        this.specLoadingRemove = false;
    };
    Redoc.prototype.load = function () {
        var _this = this;
        // bunlde spec directly if passsed or load by URL
        this.specMgr.load(this.options.spec || this.options.specUrl).catch(function (err) {
            throw err;
        });
        this.appState.loading.subscribe(function (loading) {
            if (loading) {
                _this.showLoadingAnimation();
            }
            else {
                _this.hideLoadingAnimation();
            }
        });
        this.specMgr.spec.subscribe(function (spec) {
            if (!spec) {
                _this.appState.startLoading();
            }
            else {
                _this.specLoaded = true;
                _this.changeDetector.markForCheck();
                _this.changeDetector.detectChanges();
                setTimeout(function () {
                    _this.hash.start();
                });
            }
        });
    };
    Redoc.prototype.togglePanel = function () {
        this.appState.rightPanelHidden.next(!this.panelHidden);
    };
    Redoc.prototype.ngOnInit = function () {
        var _this = this;
        this.lazyTasksService.loadProgress.subscribe(function (progress) { return _this.loadingProgress = progress; });
        this.appState.error.subscribe(function (_err) {
            if (!_err)
                return;
            _this.appState.stopLoading();
            if (_this.loadingProgress === 100)
                return;
            _this.error = _err;
            _this.changeDetector.markForCheck();
        });
        this.appState.rightPanelHidden.subscribe(function (hidden) {
            _this.panelHidden = hidden;
        });
        if (this.specUrl) {
            this.options.specUrl = this.specUrl;
        }
        this.load();
    };
    Redoc.prototype.ngOnDestroy = function () {
        var $clone = this.element.cloneNode();
        this.$parent.insertBefore($clone, this.$refElem);
    };
    return Redoc;
}(BaseComponent));
export { Redoc };
Redoc._preOptions = {};
Redoc.decorators = [
    { type: Component, args: [{
                selector: 'redoc',
                template: '<redoc-container><div class="redoc-error" *ngIf="error"><h1>Oops... ReDoc failed to render this spec</h1><div class="redoc-error-details">{{error.message}}</div></div><loading-bar *ngIf="options.lazyRendering" [progress]="loadingProgress"></loading-bar><div class="redoc-wrap" *ngIf="specLoaded && !error"><div class="background"><div class="background-actual"></div></div><div class="panel-hide-button" (click)="togglePanel()"></div><div class="menu-content" sticky-sidebar [scrollParent]="options.$scrollParent" [scrollYOffset]="options.scrollYOffset"><div class="menu-header"><api-logo></api-logo><redoc-search></redoc-search></div><side-menu></side-menu></div><div class="api-content"><warnings></warnings><api-info></api-info><operations-list></operations-list><footer><div class="powered-by-badge"><a href="https://github.com/Rebilly/ReDoc" title="Swagger-generated API Reference Documentation" target="_blank">Powered by <strong>ReDoc</strong></a></div></footer></div></div></redoc-container>',
                styles: ['@charset "UTF-8";.menu-content,.redoc-wrap,side-menu{overflow:hidden}:host{display:block;box-sizing:border-box}.redoc-wrap{z-index:0;position:relative;font-family:Roboto,sans-serif;font-size:14px;line-height:1.5em;color:#151f26}.menu-content{display:flex;flex-direction:column}[sticky-sidebar]{width:260px;background-color:#fafafa;overflow-x:hidden;transform:translateZ(0);z-index:75}@media (max-width:1000px){[sticky-sidebar]{width:100%;bottom:auto!important}}.api-content{margin-left:260px;z-index:50;position:relative;top:0}.background,.background-actual,.panel-hide-button{top:0;bottom:0;position:absolute}@media (max-width:1000px){.api-content{padding-top:3em;margin-left:0}}.background{right:0;left:260px;z-index:1}.background-actual{background:#151f26;left:60%;right:0}.panel-hide-button{background:#BDC5C9;z-index:100;cursor:pointer;left:calc((100% - 260px) * .6 - 20px + 260px);width:20px}.panel-hide-button:hover{background-color:#afb9be}.panel-hide-button:before{content:"❯";position:fixed;top:50%;margin-top:-.5em;color:#fff;font-size:20px;font-weight:700;width:20px;text-align:center}@media (max-width:1100px){.background,.panel-hide-button{display:none}}:host.panel-hidden .panel-hide-button{left:calc(100% - 20px);width:20px}:host.panel-hidden .panel-hide-button:before{content:"❮";width:20px}:host.panel-hidden .background{display:none}.redoc-error{padding:20px;text-align:center;color:#e53935}.redoc-error>h2{color:#e53935;font-size:40px}footer,footer a{color:#fff}.redoc-error-details{max-width:750px;margin:0 auto;font-size:18px}footer{position:relative;text-align:right;padding:10px 40px;font-size:15px;margin-top:-35px}footer strong{font-size:18px}'],
                providers: [
                    SpecManager,
                    MenuService,
                    SearchService,
                    LazyTasksService,
                    Marker
                ]
                //changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
Redoc.ctorParameters = function () { return [
    { type: SpecManager, },
    { type: OptionsService, },
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: AppStateService, },
    { type: LazyTasksService, },
    { type: Hash, },
]; };
Redoc.propDecorators = {
    'specUrl': [{ type: Input },],
    'specLoading': [{ type: HostBinding, args: ['class.loading',] },],
    'specLoadingRemove': [{ type: HostBinding, args: ['class.loading-remove',] },],
    'panelHidden': [{ type: HostBinding, args: ['class.panel-hidden',] },],
};
//# sourceMappingURL=redoc.js.map