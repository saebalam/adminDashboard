import React, { useState,useEffect } from 'react'
import design from '../../../../Assets/Images/design.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLessThan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


const Add_Item = () => {

    const [valid,setValid]=useState(true)

    const [inputValues, setInputValues] = useState({
        title: "",
        link: "",
        resource_name: '',
        description: ''
    })

    const handleChange = (evt) => {
        const value = evt.target.value
        setInputValues({
            ...inputValues,
            [evt.target.name]: value
        })
    }
    useEffect(() => {
        console.log(inputValues.title,inputValues.link,inputValues.resource_name,inputValues.description);
        if(inputValues.title != '' && inputValues.link != '' && inputValues.resource_name != '' && inputValues.description != ''){
            setValid(false)
        }
    }, [inputValues])
    

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('https://media-content.ccbp.in/website/react-assignment/add_resource.json')
            .then(res => {
                console.log((res));
                toast("updated Successfully!",{
                    className:"toastSuccess"
                });
            })
            .catch((err)=>{
                console.log("err is",err)
                toast("update failed!");
            })
    }

    return (
        <div>
            <div style={{ marginTop: '20px' }}><Link to='/resources' style={{ textDecoration: 'none', color: "black", width: '100px', paddingLeft: '60px', }}><FontAwesomeIcon icon={faLessThan} style={{ marginRight: '3px' }} />Resources</Link></div>
            <div style={{ display: 'flex' }} className='container'>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px', marginLeft: "10rem", marginRight: '5rem' }}>
                    <h2>Item Details</h2>
                    <form action="" style={{ border: '', minWidth: '50%', padding: "20px 0px 0px 36px" }}>
                        <div className="form-group" style={{ margin: '0 auto' }}>
                            <label htmlFor="itemName">ITEM NAME</label><br />
                            <input type="text" name='title' value={inputValues.title} onChange={handleChange} id='itemName' style={{ width: '300px' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="link">LINK</label><br />
                            <input type="text" name='link' value={inputValues.link} onChange={handleChange} id='link' style={{ width: '300px' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="resourceName">RESOURCE NAME</label><br />
                            <input type="text" name='resource_name' value={inputValues.resource_name} onChange={handleChange} id='resourceName' style={{ width: '300px' }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">DESCRIPTION</label><br />
                            <textarea name="description" value={inputValues.description} onChange={handleChange} cols="30" rows="2" id="description" style={{ width: '300px' }}></textarea>
                        </div>
                        <button className='btn btn-primary' disabled={valid} onClick={handleSubmit}>CREATE</button>
                        <ToastContainer position="bottom-center"/>
                    </form>
                </div>
                <div className='right-img' >
                    <img src={design} alt="" style={{ width: '40rem', height: '800px' }} />
                </div>
            </div>
        </div>

    )
}

export default Add_Item