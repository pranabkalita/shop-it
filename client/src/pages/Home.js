import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import Metadata from '../components/layout/Metadata'
import Product from '../components/Product'
import Loader from '../components/Loader'
import { getProducts } from './../store/actions/productAction'

const { createSliderWithTooltip } = Slider
const Range = createSliderWithTooltip(Slider.Range)

function Home({ match }) {
  // Component State
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const [ratings, setRatings] = useState(0)

  const categories = [
    'Electronics',
    'Cameras',
    'Laptops',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Cloths/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ]

  // Initiate the Dispatch
  const dispatch = useDispatch()
  const alert = useAlert()

  // Get data from Store
  const {
    loading,
    products,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
    error,
  } = useSelector((state) => state.products)

  const keyword = match.params.keyword

  // On page load, dispatch the lisProduct() action
  useEffect(() => {
    if (error) {
      return alert.error(error)
    }

    dispatch(getProducts(keyword, currentPage, price, category, ratings))
  }, [dispatch, alert, error, currentPage, keyword, price, category, ratings])

  let count = productsCount
  if (keyword) {
    count = filteredProductsCount
  }

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
              {keyword ? (
                <Fragment>
                  <div className='col-6 col-md-3 mt-5 mb-5'>
                    <div className='px-5'>
                      <Range
                        marks={{ 1: `${1}`, 1000: `${1000}` }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{ placement: 'top', visible: true }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />

                      <hr className='my-5' />

                      <div className='mt-5'>
                        <h4 className='mb-3'>Categories</h4>

                        <ul className='pl-0'>
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className='my-5' />

                      <div className='mt-5'>
                        <h4 className='mb-3'>Ratings</h4>

                        <ul className='pl-0'>
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: 'pointer',
                                listStyleType: 'none',
                              }}
                              key={star}
                              onClick={() => setRatings(star)}
                            >
                              <div className='rating-outer'>
                                <div
                                  className='rating-inner'
                                  style={{ width: `${star * 20}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className='col-6 col-md-9'>
                    <div className='row'>
                      {products &&
                        products.map((product) => (
                          <Product
                            product={product}
                            key={product._id}
                            col={4}
                          />
                        ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products &&
                products.map((product) => (
                  <Product product={product} key={product._id} col={3} />
                ))
              )}
            </div>
          </section>

          {resultsPerPage <= count && (
            <div className='d-flex justify-content-center mt-5'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={count}
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
