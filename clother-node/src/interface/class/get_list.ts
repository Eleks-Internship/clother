export default interface GetList<T> {
    getList(): Promise<T[]>;
}