"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommonFunctions = /** @class */ (function () {
    function CommonFunctions() {
    }
    CommonFunctions.prototype.chunk = function (arr, size) {
        var newArr = [];
        for (var i = 0; i < arr.length; i += size) {
            newArr.push(arr.slice(i, i + size));
        }
        return newArr;
    };
    return CommonFunctions;
}());
exports.CommonFunctions = CommonFunctions;
//# sourceMappingURL=common.functions.js.map