export interface ResponseBase<T> {
    success: boolean;
    data: T;
    error?: string;
}