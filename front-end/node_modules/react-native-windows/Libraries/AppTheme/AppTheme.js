/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTheme = void 0;
var react_native_1 = require("react-native");
var invariant = require('invariant');
var warnOnce = require('../Utilities/warnOnce');
var NativeAppTheme = react_native_1.NativeModules.RTCAppTheme;
var AppThemeModule = /** @class */ (function (_super) {
    __extends(AppThemeModule, _super);
    function AppThemeModule() {
        var _this = _super.call(this, NativeAppTheme) || this;
        _this.isAvailable = true;
        _this._highContrastColors = NativeAppTheme.initialHighContrastColors;
        _this._isHighContrast = NativeAppTheme.initialHighContrast;
        _this.addListener('highContrastChanged', function (nativeEvent) {
            _this._isHighContrast = nativeEvent.isHighContrast;
            _this._highContrastColors = nativeEvent.highContrastColors;
        });
        _this._currentTheme = NativeAppTheme.initialAppTheme;
        _super.prototype.addListener.call(_this, 'appThemeChanged', function (_a) {
            var currentTheme = _a.currentTheme;
            _this._currentTheme = currentTheme;
        });
        return _this;
    }
    AppThemeModule.prototype.addListener = function (eventType, listener, context) {
        if (eventType === 'appThemeChanged') {
            warnOnce('appThemeChanged-deprecated', 'AppTheme.appThemeChanged() has been deprecated and will be removed in a future release. ' +
                'Please use Appearance instead ' +
                'See https://microsoft.github.io/react-native-windows/docs/windowsbrush-and-theme');
        }
        return _super.prototype.addListener.call(this, eventType, listener, context);
    };
    Object.defineProperty(AppThemeModule.prototype, "currentTheme", {
        get: function () {
            warnOnce('currentTheme-deprecated', 'AppTheme.currentTheme() has been deprecated and will be removed in a future release. ' +
                'Please use Appearance instead ' +
                'See https://microsoft.github.io/react-native-windows/docs/windowsbrush-and-theme');
            return this._currentTheme;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppThemeModule.prototype, "isHighContrast", {
        get: function () {
            return this._isHighContrast;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppThemeModule.prototype, "currentHighContrastColors", {
        get: function () {
            return this._highContrastColors;
        },
        enumerable: false,
        configurable: true
    });
    return AppThemeModule;
}(react_native_1.NativeEventEmitter));
function throwMissingNativeModule() {
    invariant(false, 'Cannot use AppTheme module when native RTCAppTheme is not included in the build.\n' +
        'Either include it, or check AppTheme.isAvailable before calling any methods.');
}
// This module depends on the native `RCTAppTheme` module. If you don't include it,
// `AppTheme.isAvailable` will return `false`, and any method calls will throw.
var MissingNativeAppThemeShim = /** @class */ (function () {
    function MissingNativeAppThemeShim() {
        this.isAvailable = false;
        this.currentTheme = '';
        this.isHighContrast = false;
        this.currentHighContrastColors = {};
    }
    MissingNativeAppThemeShim.prototype.addEventListener = function () {
        throwMissingNativeModule();
    };
    MissingNativeAppThemeShim.prototype.removeEventListener = function () {
        throwMissingNativeModule();
    };
    // EventEmitter
    MissingNativeAppThemeShim.prototype.addListener = function (_eventType, _listener) {
        throwMissingNativeModule();
    };
    MissingNativeAppThemeShim.prototype.removeAllListeners = function () {
        throwMissingNativeModule();
    };
    MissingNativeAppThemeShim.prototype.removeListener = function (_eventType, _listener) {
        throwMissingNativeModule();
    };
    MissingNativeAppThemeShim.prototype.removeSubscription = function () {
        throwMissingNativeModule();
    };
    return MissingNativeAppThemeShim;
}());
exports.AppTheme = NativeAppTheme
    ? new AppThemeModule()
    : new MissingNativeAppThemeShim();
//# sourceMappingURL=AppTheme.js.map