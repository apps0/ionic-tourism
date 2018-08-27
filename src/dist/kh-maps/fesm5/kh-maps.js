import { Injectable, Component, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KhMapsService = /** @class */ (function () {
    function KhMapsService() {
    }
    KhMapsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    KhMapsService.ctorParameters = function () { return []; };
    /** @nocollapse */ KhMapsService.ngInjectableDef = defineInjectable({ factory: function KhMapsService_Factory() { return new KhMapsService(); }, token: KhMapsService, providedIn: "root" });
    return KhMapsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KhMapsComponent = /** @class */ (function () {
    function KhMapsComponent() {
    }
    /**
     * @return {?}
     */
    KhMapsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    KhMapsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kh-kh-maps',
                    template: "\n    <p>\n      kh-maps works!\n    </p>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    KhMapsComponent.ctorParameters = function () { return []; };
    return KhMapsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var KhMapsModule = /** @class */ (function () {
    function KhMapsModule() {
    }
    KhMapsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [KhMapsComponent],
                    exports: [KhMapsComponent]
                },] },
    ];
    return KhMapsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { KhMapsService, KhMapsComponent, KhMapsModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2gtbWFwcy5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8va2gtbWFwcy9saWIva2gtbWFwcy5zZXJ2aWNlLnRzIiwibmc6Ly9raC1tYXBzL2xpYi9raC1tYXBzLmNvbXBvbmVudC50cyIsIm5nOi8va2gtbWFwcy9saWIva2gtbWFwcy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBLaE1hcHNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna2gta2gtbWFwcycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHA+XG4gICAgICBraC1tYXBzIHdvcmtzIVxuICAgIDwvcD5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBLaE1hcHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEtoTWFwc0NvbXBvbmVudCB9IGZyb20gJy4va2gtbWFwcy5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0toTWFwc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtLaE1hcHNDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIEtoTWFwc01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7d0JBSkQ7Ozs7Ozs7QUNBQTtJQWFFO0tBQWlCOzs7O0lBRWpCLGtDQUFROzs7SUFBUjtLQUNDOztnQkFkRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSwrQ0FJVDtvQkFDRCxNQUFNLEVBQUUsRUFBRTtpQkFDWDs7OzswQkFWRDs7Ozs7OztBQ0FBOzs7O2dCQUdDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFDUjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQy9CLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztpQkFDM0I7O3VCQVJEOzs7Ozs7Ozs7Ozs7Ozs7In0=