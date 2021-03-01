"use strict";
/**
 * @packagedocumentation
 *
 * This package provides Windows specific components and provides JS implementations for some react-native primitives
 * Cross platform React-native primitives should be imported from 'react-native'
 * Windows specific components need to be imported from 'react-native-windows'
 *
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
   This file is used to provide the typings for this package.  The typings should only include the Windows specific types, even though
   the package actually exports the whole of the Windows implementation of react-native.

   NOTE: Concrete classes, objects etc that actually need to be exported from the package,
         need to also be added to index.windows.js
*/
__exportStar(require("./Libraries/Components/DatePicker/DatePicker"), exports);
__exportStar(require("./Libraries/Components/DatePicker/DatePickerProps"), exports);
__exportStar(require("./Libraries/Components/Flyout/FlyoutProps"), exports);
__exportStar(require("./Libraries/Components/Flyout/Flyout"), exports);
__exportStar(require("./Libraries/Components/Glyph/Glyph"), exports);
__exportStar(require("./Libraries/Components/Picker/PickerWindows"), exports);
__exportStar(require("./Libraries/Components/Popup/PopupProps"), exports);
__exportStar(require("./Libraries/Components/Popup/Popup"), exports);
__exportStar(require("./Libraries/Components/Keyboard/KeyboardExt"), exports);
__exportStar(require("./Libraries/Components/Keyboard/KeyboardExtProps"), exports);
__exportStar(require("./Libraries/Components/View/ViewWindowsProps"), exports);
__exportStar(require("./Libraries/Components/View/ViewWindows"), exports);
__exportStar(require("./Libraries/AppTheme/AppTheme"), exports);
__exportStar(require("./Libraries/AppTheme/AppThemeTypes"), exports);
//# sourceMappingURL=typings-index.js.map