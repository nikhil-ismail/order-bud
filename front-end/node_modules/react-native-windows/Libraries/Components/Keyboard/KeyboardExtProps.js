/**
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 * @format
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandledEventPhase = exports.EventPhase = void 0;
var EventPhase;
(function (EventPhase) {
    EventPhase[EventPhase["None"] = 0] = "None";
    EventPhase[EventPhase["Capturing"] = 1] = "Capturing";
    EventPhase[EventPhase["AtTarget"] = 2] = "AtTarget";
    EventPhase[EventPhase["Bubbling"] = 3] = "Bubbling";
})(EventPhase = exports.EventPhase || (exports.EventPhase = {}));
var HandledEventPhase;
(function (HandledEventPhase) {
    HandledEventPhase[HandledEventPhase["Capturing"] = 1] = "Capturing";
    HandledEventPhase[HandledEventPhase["Bubbling"] = 3] = "Bubbling";
})(HandledEventPhase = exports.HandledEventPhase || (exports.HandledEventPhase = {}));
//# sourceMappingURL=KeyboardExtProps.js.map