export interface IPipeline<R, E> {
    serialize(value: R): Promise<E>;
    deserialize<R>(data: E): Promise<R>;
}
export interface ICachedPipeline<R, E> extends IPipeline<R, E> {
    getCacheValue(entry: string): R | undefined;
    setCacheValue(entry: string, value: R): boolean;
}
export declare function isCachedPipeline<R, E>(pipeline: IPipeline<R, E>): pipeline is ICachedPipeline<R, E>;
//# sourceMappingURL=IPipeline.d.ts.map