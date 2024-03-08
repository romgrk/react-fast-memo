export default fastMemo;
export declare function fastMemo<T>(component: T): T;
export declare function fastObjectShallowCompare<T extends Record<string, any> | null>(a: T, b: T): boolean;
