import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,
  CREATE_REVIEWS_REQUEST,
  CREATE_REVIEWS_SUCCESS,
  CREATE_REVIEWS_ERROR,
  PAGE_OF_ITEMS,
  APPROVE_REVIEWS_REQUEST,
  APPROVE_REVIEWS_SUCCESS,
  APPROVE_REVIEWS_ERROR,
} from '../actions/reviews';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
  pageOfItems: [],
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_REVIEWS_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === FETCH_REVIEWS_SUCCESS) {
    return {
      ...state,
      reviews: action.reviews,
      loading: false,
    }
  } else if (action.type === FETCH_REVIEWS_ERROR) {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  } else if (action.type === CREATE_REVIEWS_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === CREATE_REVIEWS_SUCCESS) {
    return {
      ...state,
      loading: false,
      reviews: [...state.reviews, action.review]
    }
  } else if (action.type === CREATE_REVIEWS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if (action.type === PAGE_OF_ITEMS) {
    return {
      ...state,
      pageOfItems: action.pageOfItems,
    }
  } else if (action.type === APPROVE_REVIEWS_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === APPROVE_REVIEWS_SUCCESS) {
    return {
      ...state,
      loading: false,
    }
  } else if (action.type === APPROVE_REVIEWS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }
  return state;
}