import { BrowserRouter, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
