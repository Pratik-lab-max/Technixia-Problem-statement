import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import M from 'materialize-css'

const Navbar = () => {
  
  const searchModal = useRef(null)
  const [search, setSearch] = useState('')
  const [userDetails, setUserDetails] = useState([])

  useEffect(() => {
    M.Modal.init(searchModal.current)
  })

  const fetchUsers = (query) => {
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results => {
      setUserDetails(results.user)
    })
  }
  
  
  return (
    <div className='navbar'>
      <img src="https://www.pngall.com/wp-content/uploads/11/Weather-No-Background.png" alt="" />
      <li><i data-target="modal1" className="small material-icons modal-trigger" style={{color:"black"}}>search</i></li>
      <ul className='nav-menu'>
        <a href="/signup"><li>Sign Up</li></a>
        <a href="/signin"><li>Sign In</li></a>
      </ul>
      <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
        <div className="modal-content">
          <input type="text" value={search} placeholder="search users" onChange={(e) => fetchUsers(e.target.value)} />
          <ul className="collection">
            {userDetails.map(item=>{
              return <li className="collection-item">{item.email}</li>
            })}
          </ul>
        </div>       
        <div className="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch('')}>close</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
