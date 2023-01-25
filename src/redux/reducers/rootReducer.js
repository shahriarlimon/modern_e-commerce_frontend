import { productDetailsReducer, productReducer } from "./productReducer";
import { combineReducers } from 'redux'
import { updateProfileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { myOrdersReducer, newOrderReducer } from "./orderReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateProfileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer
})

export default rootReducer
