import {
  FETCH_REVIEWS_REQUEST,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_ERROR,
  CREATE_REVIEWS_REQUEST,
  CREATE_REVIEWS_SUCCESS,
  CREATE_REVIEWS_ERROR,
} from '../actions/reviews';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
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
  }
  return state;
}