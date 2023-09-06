"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportResistanceFib = exports.getSupportResistanceChannel = void 0;
// this function is expensive, don't call it too frequently
// support and resistance can be 0, means they are not available and not confirmed
function getSupportResistanceChannel(candles, window) {
    const applyWindow = window || candles.length();
    if (candles.length() < applyWindow) {
        return { support: 0, resistance: 0 };
    }
    // if a price hit the channel max and do not exceed, then that price is the support
    let max = candles.first().max;
    let min = candles.first().min;
    let pressureConfirmation = 0;
    let resistanceConfirmation = 0;
    for (let i = 0; i < candles.length(); i++) {
        // check if the candle price is similar with max
        const candle = candles.get(i);
        if (candle.max > max && (candle.max - max) / max > 0.01) {
            // reset
            pressureConfirmation = 0;
        }
        else if (Math.abs(candle.max - max) / candle.max < 0.01) {
            pressureConfirmation++;
        }
        max = Math.max(max, candle.max);
        if (candle.min < min && (min - candle.min) / candle.min > 0.01) {
            resistanceConfirmation = 0;
        }
        else if (Math.abs(candle.min - min) / candle.min < 0.01) {
            resistanceConfirmation++;
        }
        min = Math.min(min, candle.min);
    }
    let support = 0;
    let resistance = 0;
    if (pressureConfirmation > 2) {
        support = min;
    }
    if (resistanceConfirmation > 2) {
        resistance = max;
    }
    return { support, resistance };
}
exports.getSupportResistanceChannel = getSupportResistanceChannel;
// fibonacci Retracement 23.6%, 38.2%, 61.8%, and 78.6%
function getSupportResistanceFib({ historyMax, historyMin, }) {
    if (historyMax.length() === 0 || historyMin.length() === 0)
        throw new Error(`getPressureResistanceFib empty history`);
    // check if we have a drop
    if (historyMin.length() > 2 && historyMin.last() < historyMin.get(historyMin.length() - 2)) {
        const maxMinDiff = historyMax.last() - historyMin.last();
        const resistance = historyMin.last() + maxMinDiff * 0.618;
        return { resistance, support: 0 };
    }
    // check if we have a price rise
    if (historyMax.length() > 2 && historyMax.last() > historyMax.get(historyMax.length() - 2)) {
        const maxMinDiff = historyMax.last() - historyMin.last();
        const support = historyMax.last() - maxMinDiff * 0.618;
        return { resistance: 0, support };
    }
    return { resistance: 0, support: 0 };
}
exports.getSupportResistanceFib = getSupportResistanceFib;
