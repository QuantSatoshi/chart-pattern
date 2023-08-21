import { SlidingWindowArr } from 'sliding-window-arr';
import { KDJ } from "../types/sharedTypes";
/**
 *
 * @param kdjArr
 * @constructor
 * return
 * 1 = golden cross
 * 0 = no cross
 * -1 = dealth cross
 */
export declare function KdjCross(kdjArr: SlidingWindowArr<KDJ>, crossWindow?: number): number;
