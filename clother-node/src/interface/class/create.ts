export default interface Create<T> {
    create(info: any): Promise<T | null>;
}