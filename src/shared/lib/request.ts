import axios from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

const baseAPiUrl = 'http://109.73.206.144:6969/api'
const secretKey = 'E6kUTYrYwZq2tN4QEtyzsbEBk3ie'

const service = axios.create()
const useSecretKeyForRequest = (config: InternalAxiosRequestConfig) => {
  config.params['key'] = secretKey
  return config
}

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    config.url = baseAPiUrl + config.url
    const response = await service.request<T>(config)
    return response.data
  } catch (error: unknown) {
    return Promise.reject(error)
  }
}

service.interceptors.request.use(useSecretKeyForRequest, (error) => Promise.reject(error))
