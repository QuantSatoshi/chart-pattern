import { SlidingWindowArr } from "sliding-window-arr";
import { CandleSchema } from "../types/sharedTypes";
export declare function getPressureResistanceChannel(candles: SlidingWindowArr<CandleSchema>, window?: number): {
    pressure: number;
    resistance: number;
};
export declare function getPressureResistanceFib({ historyMax, historyMin }: {
    historyMax: SlidingWindowArr<number>;
    historyMin: SlidingWindowArr<number>;
}): {
    pressure: number;
    resistance: number;
};
