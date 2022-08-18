import React, { useState, useEffect } from 'react'
import './App.css';
import Resources from './Components/Resources/Resources';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Header from './Components/Resources/Header/Header';
import Requests from './Components/Requests/Requests';
import Users from './Components/Users/Users'
import Resource_Details from './Components/Resources/Resource-Details/Resource_Details';
import Add_Item from './Components/Resources/Resource-Details/Add_Item/Add_Item';
import Login from './Components/Login/Login';

function App() {

  const [resources, setResources] = useState(null)

  useEffect(() => {
    axios.get('https://media-content.ccbp.in/website/react-assignment/resources.json')
      .then(res => {
        setResources(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/resources' element={<Resources resources={resources} />} />
          <Route exact path='/requests' element={<Requests />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/resource_details/:id' element={<Resource_Details />} />
          <Route exact path='/addresource' element={<Add_Item />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
