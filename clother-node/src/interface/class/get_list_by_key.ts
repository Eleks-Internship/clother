export default interface GetListByKeys<T> {
    getListByKeys(info: object): Promise<T[]>;
}