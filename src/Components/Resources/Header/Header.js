import React, { useState, useEffect } from 'react'
import logo from '../../../Assets/Images/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserLock, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate } from 'react-router-dom'


const Header = () => {

  let button;
  const [loggedIn, setLoggedIn] = useState(false)


  const logout=()=>{
    alert('hi')
    localStorage.removeItem('token')
    setLoggedIn(false)
    
  }

  const log=localStorage.getItem('token')
  console.log("log",log)
  if(loggedIn==true){
    button=<Link style={{ border: '1px solid black' }} to='/' onClick={logout}><FontAwesomeIcon icon={faUserCheck} /></Link>
  }else{
    button=<button style={{ border: '1px solid black' }} onClick={()=>{setLoggedIn(true)}} ><FontAwesomeIcon icon={faUserLock} /></button>
  }

  return (

    <div style={{ height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 20px', borderBottom: '1px solid #d5c8c8' }}>
      <div style={{ width: '70px', height: '59px' }}>
        <Link to='/resources'><img src={logo} alt="logo" style={{ width: '100%', height: '52px' }} /></Link>  
      </div>
      <div>
        {button}
      </div>
    </div>

  )
}

export default Header



{/* {
        (loggedIn == false) &&
        
      } */}