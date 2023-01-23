import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes/cartTypes";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((product) => product._id === item._id)
            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product) => product._id === isItemExist._id ? item : product)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }

            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((product) => product._id !== action.payload)
            }
        default:
            return state
    }
}