export interface HLC {
    high: number;
    low: number;
    close: number;
}
export interface CandleSchema {
    ts: number;
    first: number;
    last: number;
    max: number;
    min: number;
    pairDb?: string;
}
export interface KDJ {
    K: number;
    D: number;
    J?: number;
}
