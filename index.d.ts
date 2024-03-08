export default fastMemo;
export declare function fastMemo<T>(component: T): T;
export declare function fastMemoUnsafe<T>(component: T): T;
export declare function fastCompare<T extends Record<string, any> | null>(a: T, b: T): boolean;
export declare function fastCompareUnsafe<T extends Record<string, any>>(a: T, b: T): boolean;
