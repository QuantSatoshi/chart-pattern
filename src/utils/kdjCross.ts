import { SlidingWindowArr } from 'sliding-window-arr';
import { KDJ } from '../types/sharedTypes';

/**
 *
 * @param kdjArr
 * @constructor
 * return
 * 1 = golden cross
 * 0 = no cross
 * -1 = dealth cross
 */
export function KdjCross(kdjArr: SlidingWindowArr<KDJ>, crossWindow = 6): number {
  const arrLen = kdjArr.length();
  if (arrLen < 10) {
    console.warn(`KdjCross len too short < 10`);
    return 0;
  }
  if (crossWindow <= 1 || crossWindow>=arrLen) {
    console.warn(`crossWindow setting is not meaningful should >1 and <history candle Len(40)`);
    return 0;
  }
  const lastKDJ = kdjArr.last()!;
  const lastK = lastKDJ.K;
  const lastD = lastKDJ.D;

  const firstIndex = Math.max(0, arrLen - crossWindow);
  const firstKDJ = kdjArr.get(firstIndex);
  const firstK = firstKDJ.K;
  const firstD = firstKDJ.D;
  // check golden cross
  // K value is Fast moving value, it should move faster
  if (lastK > lastD && firstK < firstD) {
    return 1;
  }

  // check death cross
  if (lastK < lastD && firstK > firstD) {
    return -1;
  }
  return 0;
}
