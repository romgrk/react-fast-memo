"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastObjectShallowCompare = exports.fastMemo = void 0;
var react_1 = require("react");
var is = Object.is;
exports.default = fastMemo;
function fastMemo(component) {
    return (0, react_1.memo)(component, fastObjectShallowCompare);
}
exports.fastMemo = fastMemo;
function fastObjectShallowCompare(a, b) {
    if (a === b) {
        return true;
    }
    if (!(a instanceof Object) || !(b instanceof Object)) {
        return false;
    }
    var aLength = 0;
    var bLength = 0;
    for (var key in a) {
        aLength += 1;
        if (!is(a[key], b[key])) {
            return false;
        }
        if (!(key in b)) {
            return false;
        }
    }
    for (var _ in b) {
        bLength += 1;
    }
    return aLength === bLength;
}
exports.fastObjectShallowCompare = fastObjectShallowCompare;
