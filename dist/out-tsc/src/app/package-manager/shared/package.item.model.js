"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var item_type_model_1 = require("./item.type.model");
var PackageItem = /** @class */ (function () {
    function PackageItem(name, isSelected, isRequired, selectedSubOption, selectedSubOptions, itemType, subOptions) {
        if (isSelected === void 0) { isSelected = false; }
        if (isRequired === void 0) { isRequired = false; }
        if (itemType === void 0) { itemType = item_type_model_1.ITEM_TYPE.EXTERIOR; }
        this.name = name;
        this.isSelected = isSelected;
        this.isRequired = isRequired;
        this.selectedSubOption = selectedSubOption;
        this.selectedSubOptions = selectedSubOptions;
        this.itemType = itemType;
        this.subOptions = subOptions;
    }
    return PackageItem;
}());
exports.PackageItem = PackageItem;
//# sourceMappingURL=package.item.model.js.map