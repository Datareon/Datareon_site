import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from '../src/component/Header/Header.jsx'
import Content from '../src/component/Content/Content.jsx'
import Footer from '../src/component/Footer/Footer.jsx'


function App() {

  return (
    <div className='main'>
      <Header/>
      <Content/>
      <Footer/>
    </div>
  )
}

export default App
