import React from 'react';
import { useHistory } from "react-router-dom";
import './nav.css';

export default function({userName}) {
  const history = useHistory();

  const logout = async() => {
    try{
      fetch(`/api/v1/logout`)
        .then(()=> history.push('/login') )
    }catch(err){
      console.log(err)
    }
  }
    return (
      <div className="nav-container">
      <div className="nav-left">
       <span>Hi {userName}</span>
      </div>
      <div className="nav-right">
        <button type="button" onClick={logout}>LogOut</button>
      </div>
    </div>
    ) 
}
