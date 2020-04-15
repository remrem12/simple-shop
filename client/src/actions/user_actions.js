import axios from 'axios'
import { USER_SERVER, PRODUCT_SERVER } from '../components/utils/misc'
import { 
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART_USER,
  GET_CART_ITEMS_USER,
  REMOVE_CART_ITEMS_USER,
  ON_SUCCESS_BUY_USER
} from './types' 


export function loginUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
  .then(response => response.data)
  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
  .then(res => res.data)
  return {
    type: REGISTER_USER,
    payload: request
  }
}


export function auth(){
  const request = axios.get(`${USER_SERVER}/auth`)
  .then(res => res.data)

  return {
    type: AUTH_USER,
    payload: request
  }
}


export function logoutUser(){
  const req = axios.get(`${USER_SERVER}/logout`)
  .then(res => res.data)

  return {
    type: LOGOUT_USER,
    payload: req
  }
}

export function addToCart(id){

  const res = axios.post(`${USER_SERVER}/addToCart?productId=${id}`)
  .then(res => res.data)

  return {
    type: ADD_TO_CART_USER,
    payload: res
  }
}

export function getCartItems(cartItem, userCart){

  const req = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${cartItem}&type=array`)
  .then(res => {
    userCart.forEach(item => {
      res.data.forEach((k, i) => {
        if(item.id === k._id){
          res.data[i].quantity = item.quantity
        }
      })
    })
    return res.data
  })

  return{
    type: GET_CART_ITEMS_USER,
    payload: req
  }
}


export function removeCartItem(id){
  const req = axios.get(`${USER_SERVER}/removeFromCart?_id=${id}`).
  then(res => {
    res.data.cart.forEach(item => {
      res.data.cartDetail.forEach((k, i) => {
        if(item.id === k._id){
          res.data.cartDetail[i].quantity = item.quantity
        }
      })
    })
    return res.data
  })

  return {
    type: REMOVE_CART_ITEMS_USER,
    payload: req
  }
}


export function onSuccessBuy(data){
  const req = axios.post(`${USER_SERVER}/successBuy`, data)
              .then(res => res.data)

  return {
    type: ON_SUCCESS_BUY_USER,
    payload: req
  }
}