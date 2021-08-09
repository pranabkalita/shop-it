import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'

import Metadata from '../components/layout/Metadata'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { getProducts } from './../store/actions/productAction'

function Home({ match }) {
  // Component State
  const [currentPage, setCurrentPage] = useState(1)

  // Initiate the Dispatch
  const dispatch = useDispatch()
  const alert = useAlert()

  // Get data from Store
  const { loading, products, productsCount, resultsPerPage, error } =
    useSelector((state) => state.products)

  const keyword = match.params.keyword

  // On page load, dispatch the lisProduct() action
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage))
  }, [dispatch, alert, error, currentPage, keyword])

  // Functions
  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

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

          {resultsPerPage <= productsCount && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNumber}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='First'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home
