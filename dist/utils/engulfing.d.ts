import { CandleSchema } from '../types/sharedTypes';
import { SlidingWindowArr } from "sliding-window-arr";
export declare function getEngulfingPattern(candles: SlidingWindowArr<CandleSchema>, priceChangeThreshold: 0.005): number;
