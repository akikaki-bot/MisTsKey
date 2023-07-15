import axios, { AxiosResponse } from "axios"
export async function POST<T>(path : string, data ?: T): Promise<AxiosResponse<any>> {
   return axios.post<T>(path, data)
}

export async function GETPOST<T , R>(path : string, data ?: T): Promise<AxiosResponse<R>> {
    return axios.post<T, AxiosResponse<R>>(path, data)
 }