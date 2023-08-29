import { SlidingWindowArr } from 'sliding-window-arr';
export declare function macdDivergence({ macdWindow, priceWindow, macdSignal, }: {
    macdWindow: SlidingWindowArr<number>;
    macdSignal: SlidingWindowArr<number>;
    priceWindow: SlidingWindowArr<number>;
}): 0 | 1 | -1;
