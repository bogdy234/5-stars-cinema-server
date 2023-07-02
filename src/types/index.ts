export type PromiseIServiceResponse<T> = Promise<IServiceResponse<T>>;

export interface IServiceResponse<T> {
    data?: T;
    error?: Error;
}
