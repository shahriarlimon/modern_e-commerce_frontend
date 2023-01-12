import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR } from "../actionTypes/productActionTypes"




export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload.products
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null

            }
        default:
            return state
    }
}