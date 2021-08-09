import axios from 'axios'

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CLEAR_ERRORS,
} from './../constants/productConstants'

export const getProducts =
  (keyword = '', currentPage = 1, price) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST })

      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`
      )

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.errMessage,
      })
    }
  }

export const getProductDetail = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST })

    const { data } = await axios.get(`/api/v1/products/${id}`)

    dispatch({
      type: PRODUCT_DETAIL_SUCCESS,
      payload: data.product,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload: error.response.data.errMessage,
    })
  }
}

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  })
}
