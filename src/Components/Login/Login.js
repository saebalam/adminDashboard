import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

const Login = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [formstate, setFormstate] = useState({
        user_id: '',
        password: ''
    })

    const handleChange = (evt) => {
        const value = evt.target.value
        setFormstate({
            ...formstate,
            [evt.target.name]: value
        })
    }

    const login = (evt) => {
        evt.preventDefault()
        if (process.env.REACT_APP_USER_ID == formstate.user_id && process.env.REACT_APP_PASSWORD == formstate.password) {
            setLoggedIn(true)
            localStorage.setItem('token',true)
        } else {
            alert('wrong credentials')
        }
    }

    return (
        <div >
            {(loggedIn==true)
            ? <div>
                <Navigate replace to='/resources' />
            </div>
            : 
            <div>
                <div style={{margin:"0 auto",marginTop:'50px',width:'300px',padding:'auto' ,boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px"}}>
                    <h5 style={{textAlign:'center',paddingTop:'20px'}} >
                    ADMIN LOGIN
                    </h5>
                    <form action="" style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'20px'}}>
                    <div style={{marginBottom:'15px'}}>
                        <label htmlFor="user_id">User Id</label><br />
                        <input name='user_id' type="tel" value={formstate.user_id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label><br />
                        <input name='password' type="password" value={formstate.password} onChange={handleChange} />
                    </div>
                    <button className='btn btn-primary' style={{marginTop:'20px',marginBottom:'15px'}} onClick={login}>LOGIN</button>
                    </form>
                </div>
            </div>

            }
        </div>
    )
}

export default Login


            // {(loggedIn == true) &&
                
            // }