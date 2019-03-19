import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
});

export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR';
export const fetchProductsError = (error) => ({
  type: FETCH_PRODUCTS_ERROR,
  error,
});

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(fetchProductsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/products`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => dispatch(fetchProductsSuccess(res)))
    .catch(err => dispatch(fetchProductsError(err)))
}

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const createProductRequest = () => ({
  type: CREATE_PRODUCT_REQUEST,
});

export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const createProductSuccess = (product) => ({
  type: CREATE_PRODUCT_SUCCESS,
  product,
});

export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';
export const createProductError = (error) => ({
  type: CREATE_PRODUCT_ERROR,
  error,
});

export const createProduct = (product) => (dispatch, getState) => {
  dispatch(createProductRequest());
  const { name, sport, year, releaseDate, brand, productImageUrl, breakdown, description } = product;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name,
      sport,
      year,
      releaseDate,
      brand,
      productImageUrl,
      breakdown,
      description,
    })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(createProductSuccess(data)))
    .catch(err => dispatch(createProductError(err)))
}

export const TOGGLE_REVIEW_FORM = 'TOGGLE_REVIEW_FORM';
export const toggleReviewForm = () => ({
  type: TOGGLE_REVIEW_FORM,
});

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS,
})

export const deleteProduct = (productId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      productId,
    })
  })
  .then(() => dispatch(deleteProductSuccess()))
  .then(() => dispatch(fetchProducts()))
}