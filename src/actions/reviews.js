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
  const { overallRating, valueRating, designRating, excitementRating, checklistRating, recommendProduct, youtubeUrl, userBreakImages, hitList, userReview } = review;
  const approved = false;
  const liked = [];
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
      approved,
      liked,
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

export const APPROVE_REVIEWS_REQUEST = 'APPROVE_REVIEWS_REQUEST';
export const approveReviewsRequest = () => ({
  type: APPROVE_REVIEWS_REQUEST,
});

export const APPROVE_REVIEWS_SUCCESS = 'APPROVE_REVIEWS_SUCCESS';
export const approveReviewsSuccess = (review) => ({
  type: APPROVE_REVIEWS_SUCCESS,
  review,
});

export const APPROVE_REVIEWS_ERROR = 'APPROVE_REVIEWS_ERROR';
export const approveReviewsError = (error) => ({
  type: APPROVE_REVIEWS_ERROR,
  error,
});

export const approveReview = (id, liked, approved) => (dispatch, getState) => {
  dispatch(approveReviewsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/reviews`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      id,
      approved,
      liked,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(approveReviewsSuccess(data)))
  .then(() => dispatch(fetchReviews()))
  .catch(err => dispatch(approveReviewsError(err)))
}

export const DELETE_REVIEW_SUCCESS = 'DELETE_REVIEW_SUCCESS';
export const deleteReviewSuccess = () => ({
  type: DELETE_REVIEW_SUCCESS,
})

export const deleteReview = (reviewId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      reviewId,
    })
  })
  .then(() => dispatch(deleteReviewSuccess()))
  .then(() => dispatch(fetchReviews()))
}