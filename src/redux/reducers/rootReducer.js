import { productDetailsReducer, productReducer } from "./productReducer";
import { combineReducers } from 'redux'
import { updateProfileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateProfileReducer,
  cart: cartReducer
})

export default rootReducer
