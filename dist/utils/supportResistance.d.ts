import { SlidingWindowArr } from 'sliding-window-arr';
import { CandleSchema } from '../types/sharedTypes';
export declare function getPressureResistanceChannel(candles: SlidingWindowArr<CandleSchema>, window?: number): {
    support: number;
    resistance: number;
};
export declare function getSupportResistanceFib({ historyMax, historyMin, }: {
    historyMax: SlidingWindowArr<number>;
    historyMin: SlidingWindowArr<number>;
}): {
    support: number;
    resistance: number;
};
