import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Metadata from '../components/layout/Metadata'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { getProducts } from './../store/actions/productAction'

function Home() {
  // Initiate the Dispatch
  const dispatch = useDispatch()
  const alert = useAlert()

  // Get data from Store
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  )

  // On page load, dispatch the lisProduct() action
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts())
  }, [dispatch, alert, error])

  return (
    <Fragment>
      <Metadata title={'Buy Best Products Online'} />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1 id='products_heading'>Latest Products</h1>

          <section id='products' className='container mt-5'>
            <div className='row'>
              {products &&
                products.map((product) => (
                  <Product product={product} key={product._id} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
