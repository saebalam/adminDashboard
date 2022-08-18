import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './card.css'

const Card = (props) => {
    const {icon_url,title,link}=props.props

  const id=props.props.id

  return (  
    <div id='card'  >
        <div style={{display:'flex',alignItems:"center",marginBottom: "10px"}}>
            <img src={props.props.icon_url} alt="logo" style={{width:'57px',height:'50px',borderRadius:'3px',marginRight:'5px'}} />
            <Link to={{pathname: `/resource_details/${id}`}} style={{color:"black",textDecoration:'none',style:'none'}}>
                <h5>{props.props.title}</h5></Link>
        </div>
        <Link to={props.props.link} style={{padding:'6px 2px',textDecoration:'none'}}>{props.props.link}</Link><br />
        <p style={{color:"black",marginTop:'10px'}}>{props.props.description}</p>
    </div>
  )
}

export default Card