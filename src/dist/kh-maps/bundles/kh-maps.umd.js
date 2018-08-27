(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('kh-maps', ['exports', '@angular/core'], factory) :
    (factory((global['kh-maps'] = {}),global.ng.core));
}(this, (function (exports,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var KhMapsService = (function () {
        function KhMapsService() {
        }
        KhMapsService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        KhMapsService.ctorParameters = function () { return []; };
        /** @nocollapse */ KhMapsService.ngInjectableDef = i0.defineInjectable({ factory: function KhMapsService_Factory() { return new KhMapsService(); }, token: KhMapsService, providedIn: "root" });
        return KhMapsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var KhMapsComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var KhMapsModule = (function () {
        function KhMapsModule() {
        }
        KhMapsModule.decorators = [
            { type: i0.NgModule, args: [{
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

    exports.KhMapsService = KhMapsService;
    exports.KhMapsComponent = KhMapsComponent;
    exports.KhMapsModule = KhMapsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2gtbWFwcy51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2toLW1hcHMvbGliL2toLW1hcHMuc2VydmljZS50cyIsIm5nOi8va2gtbWFwcy9saWIva2gtbWFwcy5jb21wb25lbnQudHMiLCJuZzovL2toLW1hcHMvbGliL2toLW1hcHMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgS2hNYXBzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2toLWtoLW1hcHMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAga2gtbWFwcyB3b3JrcyFcbiAgICA8L3A+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgS2hNYXBzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLaE1hcHNDb21wb25lbnQgfSBmcm9tICcuL2toLW1hcHMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtLaE1hcHNDb21wb25lbnRdLFxuICBleHBvcnRzOiBbS2hNYXBzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBLaE1hcHNNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkNvbXBvbmVudCIsIk5nTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozs0QkFKRDs7Ozs7OztBQ0FBO1FBYUU7U0FBaUI7Ozs7UUFFakIsa0NBQVE7OztZQUFSO2FBQ0M7O29CQWRGQyxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLFFBQVEsRUFBRSwrQ0FJVDt3QkFDRCxNQUFNLEVBQUUsRUFBRTtxQkFDWDs7Ozs4QkFWRDs7Ozs7OztBQ0FBOzs7O29CQUdDQyxXQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLEVBQ1I7d0JBQ0QsWUFBWSxFQUFFLENBQUMsZUFBZSxDQUFDO3dCQUMvQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7cUJBQzNCOzsyQkFSRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==