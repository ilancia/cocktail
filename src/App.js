import React from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import Home from './Page/Home'
import Header from './Component/Header'

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </div>
  )
}
export default App;