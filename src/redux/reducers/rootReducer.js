import { productDetailsReducer, productReducer } from "./productReducer";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer
})

export default rootReducer
