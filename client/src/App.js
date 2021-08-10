import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import Profile from './pages/user/Profile'
import ProtectedRoute from './components/routes/ProtectedRoute'

import { loadUser } from './store/actions/userAction'

import './App.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <Route path='/search/:keyword' component={Home} exact />
          <Route path='/product/:id' component={ProductDetail} exact />

          <ProtectedRoute path='/me' component={Profile} exact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
