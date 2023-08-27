"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macdDivergence = void 0;
function macdDivergence({ macdWindow, priceWindow, macdSignal, }) {
    // if price is rising, but macd has down trend, then it is diverged
    if (priceWindow.length() === 0 || macdWindow.length() === 0) {
        throw new Error(`macdDivergence require non empty values`);
    }
    if (priceWindow.last() > priceWindow.first() && macdWindow.last() < macdWindow.first()) {
        return 1;
    }
    if (priceWindow.last() < priceWindow.first() && macdWindow.last() > macdWindow.last()) {
        return -1;
    }
    return 0;
}
exports.macdDivergence = macdDivergence;
