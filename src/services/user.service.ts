import { userApi } from './api'

export const getUserProfile = () => {
  return userApi.get('/users/profile')
}

export const updateUserProfile = (payload: any) => {
  return userApi.put('/users/profile', payload)
}

export const uploadUserImage = (formData: FormData) => {
  return userApi.put('/users/profile/image', formData)
}

export const getUserAddresses = () => {
  return userApi.get('/users/addresses')
}

export const updateUserAddress = (id: string, payload: any) => {
  return userApi.put(`/users/addresses/${id}`, payload)
}

export const createUserAddress = (payload: any) => {
  return userApi.post('/users/addresses', payload)
}
