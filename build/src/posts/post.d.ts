import { AxiosResponse } from "axios";
export declare function POST<T>(path: string, data?: T): Promise<AxiosResponse<any>>;
export declare function GETPOST<T, R>(path: string, data?: T): Promise<AxiosResponse<R>>;
