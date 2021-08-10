import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'

function ProtectedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to='/login' />
            }

            return <Component {...props} />
          }}
        />
      )}
    </Fragment>
  )
}

export default ProtectedRoute
