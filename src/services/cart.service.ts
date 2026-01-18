import { userApi } from './api'

export const getCart = () => userApi.get('/carts')

export const addToCartApi = (productId: string) =>
  userApi.post('/carts', { productId })

export const removeFromCartApi = (productId: string) =>
  userApi.delete(`/carts/${productId}`)

export const clearCartApi = () => userApi.delete('/carts')
