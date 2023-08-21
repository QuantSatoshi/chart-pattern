// https://www.investopedia.com/articles/active-trading/100115/why-macd-divergence-unreliable-signal.asp
import { SlidingWindowArr } from "sliding-window-arr";

export function macdDivergence({macdWindow, priceWindow,macdSignal}:{macdWindow: SlidingWindowArr<number>, macdSignal: SlidingWindowArr<number>, priceWindow: SlidingWindowArr<number>}) {
  // if price is rising, but macd has down trend, then it is diverged
  if (priceWindow.length() === 0 ||macdWindow.length() === 0) throw new Error(`macdDivergence require non empty values`);

  if (priceWindow.last()! > priceWindow.first()! && macdWindow.last()! < macdWindow.first()!) {
    return true;
  }
  if (priceWindow.last()! < priceWindow.first()! && macdWindow.last()! > macdWindow.last()!) {
    return true;
  }
  return false;
}
