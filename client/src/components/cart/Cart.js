import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Metadata from '../layout/Metadata'
import {
  addItemToCart,
  removeItemFromCart,
} from '../../store/actions/cartAction'

function Cart() {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { cartItems } = useSelector((state) => state.cart)

  const increaseQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1
    if (newQuantity > stock) return

    dispatch(addItemToCart(id, newQuantity))
  }

  const decreaseQuantity = (id, quantity) => {
    const newQuantity = quantity - 1
    if (newQuantity <= 0) return

    dispatch(addItemToCart(id, newQuantity))
  }

  const removeCartItem = (id) => {
    dispatch(removeItemFromCart(id))
    alert.success('Item has been removed from cart.')
  }

  return (
    <Fragment>
      <Metadata title='Your Cart' />
      {cartItems.length === 0 ? (
        <h2 className='mt-5'>Your cart is empty</h2>
      ) : (
        <Fragment>
          <h2 className='mt-5'>
            Your Cart: <b>{cartItems.length} items</b>
          </h2>

          <div className='row d-flex justify-content-between'>
            <div className='col-12 col-lg-8'>
              {cartItems.map((item) => (
                <Fragment key={item.product}>
                  <hr />
                  <div className='cart-item'>
                    <div className='row'>
                      <div className='col-4 col-lg-3'>
                        <img
                          src={item.image}
                          alt='Laptop'
                          height='90'
                          width='115'
                        />
                      </div>

                      <div className='col-5 col-lg-3'>
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>

                      <div className='col-4 col-lg-2 mt-4 mt-lg-0'>
                        <p id='card_item_price'>${item.price}</p>
                      </div>

                      <div className='col-4 col-lg-3 mt-4 mt-lg-0'>
                        <div className='stockCounter d-inline'>
                          <span
                            className='btn btn-danger minus'
                            onClick={() =>
                              decreaseQuantity(item.product, item.quantity)
                            }
                          >
                            -
                          </span>
                          <input
                            type='number'
                            className='form-control count d-inline'
                            value={item.quantity}
                            readOnly
                          />

                          <span
                            className='btn btn-primary plus'
                            onClick={() =>
                              increaseQuantity(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                          >
                            +
                          </span>
                        </div>
                      </div>

                      <div className='col-4 col-lg-1 mt-4 mt-lg-0'>
                        <i
                          id='delete_cart_item'
                          className='fa fa-trash btn btn-danger'
                          onClick={() => removeCartItem(item.product)}
                        ></i>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))}
            </div>

            <div className='col-12 col-lg-3 my-4'>
              <div id='order_summary'>
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{' '}
                  <span className='order-summary-values'>
                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{' '}
                    (Units)
                  </span>
                </p>
                <p>
                  Est. total:{' '}
                  <span className='order-summary-values'>
                    $
                    {cartItems
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </p>

                <hr />
                <button id='checkout_btn' className='btn btn-primary btn-block'>
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Cart
