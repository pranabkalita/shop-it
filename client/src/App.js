import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} exact />
          <Route path='/product/:id' component={ProductDetail} exact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
