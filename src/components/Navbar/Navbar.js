import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src="https://www.pngall.com/wp-content/uploads/11/Weather-No-Background.png" alt="" />
      <ul className='nav-menu'>
        <a href="/signup"><li>Sign Up</li></a>
        <a href="/signin"><li>Sign In</li></a>
      </ul>
    </div>
  )
}

export default Navbar
