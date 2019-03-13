import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST';
export const fetchReviewsRequest = () => ({
  type: FETCH_REVIEWS_REQUEST,
  loading: true,
});

export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS';
export const fetchReviewsSuccess = (reviews) => ({
  type: FETCH_REVIEWS_SUCCESS,
  reviews,
});

export const FETCH_REVIEWS_ERROR = 'FETCH_REVIEWS_ERROR';
export const fetchReviewsError = (errors) => ({
  type: FETCH_REVIEWS_ERROR,
  errors,
});

export const fetchReviews = () => (dispatch, getState) => {
  dispatch(fetchReviewsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/reviews`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchReviewsSuccess(res)))
  .catch(err => dispatch(fetchReviewsError(err)))
}

export const CREATE_REVIEWS_REQUEST = 'CREATE_REVIEWS_REQUEST';
export const createReviewsRequest = () => ({
  type: CREATE_REVIEWS_REQUEST,
});

export const CREATE_REVIEWS_SUCCESS = 'CREATE_REVIEWS_SUCCESS';
export const createReviewsSuccess = (review) => ({
  type: CREATE_REVIEWS_SUCCESS,
  review,
});

export const CREATE_REVIEWS_ERROR = 'CREATE_REVIEWS_ERROR';
export const createReviewsError = (error) => ({
  type: CREATE_REVIEWS_ERROR,
  error,
});

export const createReview = (username, productName, review) => (dispatch, getState) => {
  dispatch(createReviewsRequest());
  const { overallRating, valueRating, designRating, excitementRating, checklistRating, recommendProduct, youtubeUrl, userBreakImages, hitList, userReview } = review
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      username,
      productName,
      overallRating,
      valueRating,
      designRating,
      excitementRating,
      checklistRating,
      recommendProduct,
      youtubeUrl,
      userBreakImages,
      hitList,
      userReview,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(createReviewsSuccess(data)))
  .catch(err => dispatch(createReviewsError(err)))
}

export const PAGE_OF_ITEMS = 'PAGE_OF_ITEMS';
export const pageOfItems = (pageOfItems) => ({
  type: PAGE_OF_ITEMS,
  pageOfItems,
})