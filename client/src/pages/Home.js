import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Metadata from '../components/layout/Metadata'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { getProducts } from './../store/actions/productAction'

function Home() {
  // Initiate the Dispatch
  const dispatch = useDispatch()

  // Get data from Store
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  )

  // On page load, dispatch the lisProduct() action
  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

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
