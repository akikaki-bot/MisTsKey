import axios, { AxiosResponse } from "axios"
import { BaseMisTskeyError, MisTsKeyError } from "../components/error"
export async function POST<T>(path : string, data ?: T): Promise<AxiosResponse<any>> {
   return axios.post<T>(path, data)
   .catch((error) => {
      const Message = error.response.data.error
      throw new MisTsKeyError(Message)
   })
}

export async function GETPOST<T , R>(path : string, data ?: T): Promise<AxiosResponse<R , BaseMisTskeyError>> {
    return axios.post<T, AxiosResponse<R, BaseMisTskeyError>>(path, data)
    .catch((error) => {
      const Message = error.response.data.error
      throw new MisTsKeyError(Message)
    })
 }