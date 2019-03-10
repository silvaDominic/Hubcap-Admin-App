"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Promo = /** @class */ (function () {
    function Promo(title, frequency, startDate, endDate, startTime, endTime, isStandardDiscount, percentDiscount, discountAmount) {
        this.title = title;
        this.frequency = frequency;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isStandardDiscount = isStandardDiscount;
        this.percentDiscount = percentDiscount;
        this.discountAmount = discountAmount;
    }
    return Promo;
}());
exports.Promo = Promo;
//# sourceMappingURL=promo.model.js.map