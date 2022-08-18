import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ScaleLoader from 'react-spinners/ScaleLoader'
import Card from '../Resources/Resource-Details/Card/Card'
import '../Resources/resources.css'

const override:CSSProperties={
    position:'absolute',
    display:'block',
    left:'700px',
    top:'270px',
    borderColor:'red'
  }


const Requests = () => {
    const [requests, setRequests] = useState()
    const [spinner,setSpinner]=useState(true)

    var arr = []
    useEffect(() => {
        axios.get(`https://media-content.ccbp.in/website/react-assignment/resources.json`)
            .then(res => {
                arr = res.data.filter(item => item.tag == 'request')
                setSpinner(false)
                setRequests(arr)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [])

    return (
        <div>
            {(spinner==true)
            ? <div>
                <ScaleLoader color="blue" loading={spinner} cssOverride={override} size={150} />
                </div>
            : <div>
                <div className='nav-btn' style={{ display: 'flex', justifyContent: 'center' }}>
                <Link to='/resources' data-toggle="button" className='btn-active'><button>Resources</button></Link>
                <Link to='/requests'  ><button id='btn-active' >Requests</button></Link>
                <Link to='/users' ><button>Users</button></Link>
            </div>
            <div style={{ display: 'flex', flexGrow: '1', flexWrap: 'wrap', margin: '0 auto', width: '85%', justifyContent: 'center' }}>
                {(requests) &&
                    requests.map(request => {
                        return <Card props={request} key={request.id}/>
                    })

                }
            </div>
            </div>

            }
        </div>
    )
}

export default Requests