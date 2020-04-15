import axios from 'axios'
import { PRODUCT_SERVER } from '../components/utils/misc'
import { 
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from './types' 


export function getProductsBySell(){
  // articles?sortBy=sold&order=desc&limit=4
  const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
              .then(res => res.data)
  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: req
  }

}

export function getProductsByArrival(){
  // articles?sortBy=sold&order=desc&limit=4
  const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
              .then(res => res.data)
  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: req
  }
}


export function addProduct(dataToSubmit){
  const req = axios.post(`${PRODUCT_SERVER}/article/`,dataToSubmit)
              .then(res => res.data)

  return {
    type: ADD_PRODUCT,
    payload: req
  }
}

export function clearProduct(){
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}


////////////////////////////
////////  CATEGORY
////////////////////////////

export function getBrands(){
  const req = axios.get(`${PRODUCT_SERVER}/brands`)
              .then(res => res.data)

  return {
    type: GET_BRANDS,
    payload: req
  }
}


export function getWoods(){
  const req = axios.get(`${PRODUCT_SERVER}/woods`)
              .then(res => res.data)

  return {
    type: GET_WOODS,
    payload: req
  }
}


export function getProductsToShop(skip, limit, filters = [], previousState = []){
  const data = {
    limit,
    skip, 
    filters
  }

  const req = axios.post(`${PRODUCT_SERVER}/shop`, data)
              .then((res => {
                let newState = [
                  ...previousState,
                  ...res.data.articles
                ]
                return {
                  size: res.data.size,
                  articles: newState
                }
              }))
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: req
  }
}


export function getProductDetail(id){
  const req = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
  .then(res => res.data[0])

  return {
    type: GET_PRODUCT_DETAIL,
    payload: req
  }
}

export function clearProductDetail(id){
  
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  }
}