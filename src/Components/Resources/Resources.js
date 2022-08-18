import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Card from './Resource-Details/Card/Card'
import './resources.css'
import ScaleLoader from 'react-spinners/ScaleLoader'
import Resource_Details from './Resource-Details/Resource_Details'
import styled from 'styled-components';


const override: CSSProperties = {
  position: 'absolute',
  display: 'block',
  left: '700px',
  top: '270px',
  borderColor: 'red'
}

const Resources = (props) => {
  const [search, setSearch] = useState("")
  const [resources, setResources] = useState(props.resources)
  const [spinner, setSpinner] = useState(true)
  const [isError, setIsError] = useState(false)
  

  

  useEffect(() => {
    axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
      .then(res => {
        setResources(res.data.filter(resource => resource.title.toLowerCase().includes(search) || search.toLowerCase().includes(resource.title.toLowerCase())))
        setSpinner(false)
      })
      .catch((err) => {
        setSpinner(false)
        setIsError(true)
      })
  }, [search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div>
      <div>
        <div className='nav-btn' style={{ display: 'flex', justifyContent: 'center' }}>
          <Link to='/resources' data-toggle="button" ><button id='btn-active'>Resources</button></Link>
          <Link to='/requests'  ><button>Requests</button></Link>
          <Link to='/users'><button>Users</button></Link>
        </div>

        <div className='container' id='search-container' style={{ marginLeft: '4rem', width: '50%' }}>

          <div className="input-group mb-3" id='inp-grp'>
            <span className="input-group-text" id="basic-addon1"><button style={{ border: 'none' }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></span>
            <input type="text" className="form-control" value={search} onChange={handleSearch} placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>

        {(spinner == true)
          ? <div><ScaleLoader color="blue" loading={spinner} cssOverride={override} size={150} /></div>
          : <div>
            {
              (isError == true)
                ?
                <div style={{ marginLeft: '500px', marginTop: '50px' }}>
                  <h2>Ooops !! Something went wrong</h2>
                  <ul>
                    <li>Check your internet connection</li>
                    <li>Try refreshing page</li>

                  </ul>
                </div>

                :
                <div>
                  {(resources) &&
                    <div id='card-wrapper' style={{ display: 'flex', flexGrow: '1', flexWrap: 'wrap', margin: '0 auto', width: '100%', justifyContent: 'center' }}>
                      {
                        resources.map(resource => {
                          const id = resource.id
                          return <Card props={resource} key={resource.id} />
                        })
                      }
                    </div>
                  }
                </div>
            }
          </div>
        }
      </div>

      
    </div >
  )
}

export default Resources