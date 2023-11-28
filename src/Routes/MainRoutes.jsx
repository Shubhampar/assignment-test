import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home'
import SinglePostPage from '../Pages/SinglePostPage'

function MainRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Post/:id' element={<SinglePostPage/>}/>
    </Routes>
  )
}

export default MainRoutes
