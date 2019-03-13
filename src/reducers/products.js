import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  TOGGLE_REVIEW_FORM,
} from '../actions/products';

const initialState = {
  products: null,
  loading: false,
  error: null,
  toggleReviewForm: false,
}

export default function reducer(state=initialState, action) {
  if(action.type === FETCH_PRODUCTS_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === FETCH_PRODUCTS_SUCCESS) {
    return {
      ...state,
      loading: false, 
      products: action.products,
    }
  } else if (action.type === FETCH_PRODUCTS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if (action.type === CREATE_PRODUCT_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === CREATE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      products: [...state.products, action.product]
    }
  } else if (action.type === CREATE_PRODUCT_ERROR) {
    return {
      ...state,
      loading: false, 
      error: action.error,
    }
  } else if (action.type === TOGGLE_REVIEW_FORM) {
    return {
      ...state,
      toggleReviewForm: !state.toggleReviewForm,
    }
  }
  return state;
}