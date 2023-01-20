import { productDetailsReducer, productReducer } from "./productReducer";
import { combineReducers } from 'redux'
import { updateProfileReducer, userReducer } from "./userReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: updateProfileReducer 
})

export default rootReducer
