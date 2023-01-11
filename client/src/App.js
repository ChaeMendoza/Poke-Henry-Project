import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage/LandingPage'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import CreateNew from './pages/CreateNew/CreateNew'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/details/:id' element={<Details />} />
        <Route exact path='/create-new' element={<CreateNew />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
