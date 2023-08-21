import { CandleSchema } from "../types/sharedTypes";

//https://www.aimarrow.com/technical-analysis/the-engulfing-candlestick-patterns-bullish-engulfing-bearish-engulfing/
// -1: drop engulfing, bear
// 0: no devour pattern
// 1: rise engulfing, bull
export function getEngulfingPattern(candles: CandleSchema[], priceChangeThreshold: 0.005): number {
  if (candles.length < 3) {
    console.warn(`isDevourShortPattern requires candle length >= 3`);
    return 0;
  }
  const lastCandle = candles[candles.length -1];
  const prevCandle = candles[candles.length -2];
  const prevPrevCandle = candles[candles.length -3];
  if (Math.abs(lastCandle.last - lastCandle.first) / lastCandle.last < priceChangeThreshold) return 0;
  if (Math.abs(prevCandle.last - prevCandle.first) / prevCandle.last < priceChangeThreshold) return 0;
  // detect a price rise then drop
  if (lastCandle.last < lastCandle.first && prevCandle.last > prevCandle.first && prevCandle.last > prevPrevCandle.last) {
    const dropRange = lastCandle.first - lastCandle.last;
    const riseRange = prevCandle.last - prevCandle.first;
    if (dropRange > riseRange) return -1;
  }
  // detect price drop then rise
  if (lastCandle.last > lastCandle.first && prevCandle.last < prevCandle.first && prevCandle.last < prevPrevCandle.last) {
    const dropRange = prevCandle.first - prevCandle.last;
    const riseRange = lastCandle.last - lastCandle.first;
    if (riseRange > dropRange) return 1;
  }

  return 0;
}
