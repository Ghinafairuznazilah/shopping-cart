import Item1 from '../images/avocado.jpg'
import Item2 from '../images/carrot.jpg'
import Item3 from '../images/corn.jpg'
import Item4 from '../images/garlic.jpg'
import Item5 from '../images/red-chili.jpg'
import Item6 from '../images/tomato.jpg'
import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING } from '../actions/action-types/cartActions'
import produce from 'immer'


const initState = {
  items: [
    { id: 1, title: 'Avocado', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 110, img: Item1, quantity: 0 },
    { id: 2, title: 'Carrot', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 80, img: Item2, quantity: 0 },
    { id: 3, title: 'Corn', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 120, img: Item3, quantity: 0 },
    { id: 4, title: 'Garlic', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 260, img: Item4, quantity: 0 },
    { id: 5, title: 'Red Chili', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 160, img: Item5, quantity: 0 },
    { id: 6, title: 'Tomato', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price: 90, img: Item6, quantity: 0 }
  ],
  addedItems: [],
  total: 0

}




const cartReducer = (state = initState, action) => {

  function removeItem(id) {
    const addedItems = state.addedItems.filter(item => item.id !== id)
  
    const nextState = produce(state, (draf) => {
      if (draf.addedItems.find(item => (item.id === id))) {
        const found = draf.items.find(item => (item.id === id))
        found.quantity = 0;
      }
    })
  
    let total = 0;
    addedItems.map((item) => total += parseInt(item.price) * parseInt(item.quantity))
    console.log(total)
    if (total.length === 0) total = 0;
  
    return {
      ...nextState,
      addedItems: addedItems,
      total: total
    };
  }

  //INSIDE HOME COMPONENT
  if (action.type === ADD_TO_CART) {
    // Add code here
    
    const nextState = produce(state, (draf) => {
      const id = action.payload;
      if (draf.addedItems.find(item => (item.id === id))) {
        const found = draf.addedItems.find(item => (item.id === id))
        found.quantity++;
        draf.total += parseInt(found.price)
      } else {
        const found = draf.items.find(item => (item.id === id))
        found.quantity++;
        draf.addedItems.push(found)
        draf.total += parseInt(found.price)
      }
    })

    return nextState;
  }

  if (action.type === REMOVE_ITEM) {
    // Add code here
    const id = action.payload;  

    return removeItem(id)
  }


  //INSIDE CART COMPONENT
  if (action.type === ADD_QUANTITY) {
    // Add code here
    const nextState = produce(state, (draf) => {
      const id = action.payload;
      const found = draf.addedItems.find(item => (item.id === id))
      found.quantity++;
      draf.total += parseInt(found.price)
    })

    return nextState;
  }
  if (action.type === SUB_QUANTITY) {
    // Add code here
    const nextState = produce(state, (draf) => {
      const id = action.payload;
      const found = draf.addedItems.find(item => (item.id === id))
      if (found.quantity === 1){
        return removeItem(id)
      }
      found.quantity--;
      draf.total -= parseInt(found.price)
    })

    return nextState;
  }

  if (action.type === ADD_SHIPPING) {
    // Add code here (OPTIONAL)
    const nextState = produce(state, (draf) => {
      draf.total += 6;
    })

    return nextState;
  }

  if (action.type === SUB_SHIPPING) {
    // Add code here (OPTIONAL)
    const nextState = produce(state, (draf) => {
      draf.total -= 6;
    })

    return nextState;
  }

  else {
    return state
  }

}

export default cartReducer