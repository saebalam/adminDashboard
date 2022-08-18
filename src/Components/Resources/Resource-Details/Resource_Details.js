import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLessThan,faMagnifyingGlass,faBars } from '@fortawesome/free-solid-svg-icons'
import SortIcon from '@mui/icons-material/Sort';
import ScaleLoader from 'react-spinners/ScaleLoader'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Table from './Table'
import '../../../App.css'
import 'react-toastify/dist/ReactToastify.css';

const override:CSSProperties={
    position:'absolute',
    display:'block',
    left:'700px',
    top:'100px',
    borderColor:'red'
}

const Resource_Details = () => {

    const [resourceDetails, setResourceDetails] = useState(null)
    const [resourceDetailsLocal, setResourceDetailsLocal] = useState([])
    const [spinner,setSpinner]=useState(true)
    const [checked,setChecked]=useState(false)
    const [search, setSearch] = useState("")

    const user_id = useParams().id;

    
    
    
    useEffect(() => {
        axios.get(`https://media-content.ccbp.in/website/react-assignment/resource/${user_id}.json`)
        .then(res => {
            setResourceDetails(res.data);
            setResourceDetailsLocal((res.data.resource_items ))
                setSpinner(false)
            })
            .then(err=>{
                console.log(err)
            })
        }, [])
        
        useEffect(()=>{
            var arr=resourceDetailsLocal.filter(resource => resource.title.toLowerCase().includes(search) || search.toLowerCase().includes(resource.title.toLowerCase()))
            setResourceDetailsLocal(arr)
        },[search])
        
        const handleSearch = (e) => {
            setSearch(e.target.value)
          }
        
        return (
        <div>
            {(spinner==true)
            ?
            <div><ScaleLoader color="blue" loading={spinner} cssOverride={override} size={150} /></div>
            :
            <div>
                <div>
            {(resourceDetailsLocal) &&
                <div className='container'>
                    
                    <Link to='/resources' style={{textDecoration:'none',color:"black"}}><FontAwesomeIcon icon={faLessThan} style={{marginRight:'3px'}} />Resources</Link>
                    <div style={{ display: "flex", alignItems: 'center',marginTop:'9px' }}>
                        <div>
                            <img src={resourceDetails.icon_url} alt="" style={{ width: '52px', height: '52px',borderRadius:'28px', marginRight: '5px' }} />
                        </div>
                        <div>
                            <h4 style={{marginBottom:'2px'}}>{resourceDetails.title}</h4>
                            <Link to=''>{resourceDetails.link}</Link>
                        </div>
                    </div>
                    <div style={{marginTop:'5px'}}>{resourceDetails.description}</div>
                    <div>
                        <button className='btn btn-primary' style={{ marginTop: '2rem' }} >UPDATE</button>  
                    </div>
                    <div style={{ display: 'flex', marginTop: '35px', marginBottom: '6px', justifyContent: 'space-between', alignItems:'center'}}>
                        <div className="left">
                            <h4>Items</h4>
                        </div>
                        <div className="right" style={{ display: 'flex' }}>
                            <div class="input-group mb-3" style={{marginRight:'4px'}}>
                                <span class="input-group-text" id="basic-addon1"><button style={{ border: 'none' }}><FontAwesomeIcon icon={faMagnifyingGlass} /></button></span>
                                <input type="text" class="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch} />
                            </div>
                            <div><SortIcon /></div>
                        </div>
                    </div>

                    <Table data={resourceDetailsLocal} rowsPerPage={6} />

                    <div style={{marginTop:'9px',marginBottom:'20px'}}>
                        <Link to={{pathname:`/addresource`}}><button className='btn btn-success' disabled={checked} style={{marginRight:'10px'}} >ADD ITEM</button></Link>
                        <button className='btn btn-danger' disabled={!checked}>Delete</button>
                    </div>

                </div>
            }
        </div>
            </div>

            }
        </div>
    )
}

export default Resource_Details

