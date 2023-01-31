import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducer } from "./productReducer";
import { combineReducers } from 'redux'
import { allUsersReducer, updateProfileReducer, userDetailsReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateProfileReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  allOrders: allOrdersReducer,
  newProduct: newProductReducer,
  product: productReducer,
  order: orderReducer
})

export default rootReducer
