import React from 'react'
import { useState } from 'react'
import './App.css'
import Deshboard from './components/Deshboard'
import { Routes,Route ,Navigate} from 'react-router-dom'
import MathExpretion from './components/MathExpretion'
import SignUp from './components/Signup'
import SignIn from './components/Signin'


function App() {
  return (
    <> 
      <Routes>
        <Route path='/home' element={<Deshboard/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/math-game' element={<MathExpretion/>}/>
        <Route path="/" element={<Navigate to="/signup"/> }/>
      </Routes>
      
    </>
  )
}

export default App
