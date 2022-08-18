import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import Card from '../Resources/Resource-Details/Card/Card'

const override: CSSProperties = {
    position: 'absolute',
    display: 'block',
    left: '700px',
    top: '270px',
    borderColor: 'red'
}

const Users = () => {

    const [spinner, setSpinner] = useState(true)

    const [users, setUsers] = useState()
    var arr = []
    useEffect(() => {
        axios.get(`https://media-content.ccbp.in/website/react-assignment/resources.json`)
            .then(res => {
                arr = res.data.filter(item => item.tag == 'user')
                setUsers(arr)
                setSpinner(false)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])


    return (
        <div>
            {(spinner == true)
                ? <div>
                    <ScaleLoader color="blue" loading={spinner} cssOverride={override} size={150} />
                </div>
                : <div>
                    <div className='nav-btn' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/resources' data-toggle="button"><button>Resources</button></Link>
                        <Link to='/requests'  ><button>Requests</button></Link>
                        <Link to='/users' ><button id='btn-active'>Users</button></Link>
                    </div>
                    <div style={{ display: 'flex', flexGrow: '1', flexWrap: 'wrap', margin: '0 auto', width: '85%', justifyContent: 'center' }}>
                        {(users) &&
                            users.map(user => {
                                return <Card props={user} key={user.id}/>
                            })

                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Users