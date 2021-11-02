import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING } from './action-types/cartActions'

//add cart action
export const addToCart = (id) => {
  // Add code here
  return {
    type: ADD_TO_CART,
    payload: id
  }
}
//remove item action
export const removeItem = (id) => {
  // Add code here
  return {
    type: REMOVE_ITEM,
    payload: id
  }
}
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    payload: id
  }
}
//add qt action
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    payload: id
  }
}

// OPTIONAL, NOT MANDATORY
export const addShipping = () => {
  // Add code here
  return {
    type: ADD_SHIPPING,
  }
}

export const substractShipping = () => {
  // Add code here
  return {
    type: SUB_SHIPPING,
  }
}