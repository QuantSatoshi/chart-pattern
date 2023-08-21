import { CandleSchema } from '../types/sharedTypes';
import { SlidingWindowArr } from 'sliding-window-arr';

//https://www.aimarrow.com/technical-analysis/the-engulfing-candlestick-patterns-bullish-engulfing-bearish-engulfing/
// -1: drop engulfing, bear
// 0: no devour pattern
// 1: rise engulfing, bull
export function getEngulfingPattern(candles: SlidingWindowArr<CandleSchema>, priceChangeThreshold = 0.005): number {
  if (candles.length() < 3) {
    console.warn(`isDevourShortPattern requires candle length >= 3`);
    return 0;
  }
  const lastCandle = candles.get(candles.length() - 1);
  const prevCandle = candles.get(candles.length() - 2);
  const prevPrevCandle = candles.get(candles.length() - 3);
  if (Math.abs(lastCandle.last - lastCandle.first) / lastCandle.last < priceChangeThreshold) return 0;
  if (Math.abs(prevCandle.last - prevCandle.first) / prevCandle.last < priceChangeThreshold) return 0;
  // detect a price rise then drop
  if (
    lastCandle.last < lastCandle.first &&
    prevCandle.last > prevCandle.first &&
    prevCandle.last > prevPrevCandle.last
  ) {
    const dropRange = lastCandle.first - lastCandle.last;
    const riseRange = prevCandle.last - prevCandle.first;
    if (dropRange > riseRange) return -1;
  }
  // detect price drop then rise
  if (
    lastCandle.last > lastCandle.first &&
    prevCandle.last < prevCandle.first &&
    prevCandle.last < prevPrevCandle.last
  ) {
    const dropRange = prevCandle.first - prevCandle.last;
    const riseRange = lastCandle.last - lastCandle.first;
    if (riseRange > dropRange) return 1;
  }

  return 0;
}
