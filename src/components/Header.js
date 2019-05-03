import React from 'react'
import { NavLink } from 'react-router-dom'

function Header () {
  return (
    <header className='c-header'>
      <NavLink to='/'><h1>Farmers</h1></NavLink>
    </header>
  )
}

export default Header
