import React from 'react';
import './nav.css';

export default function({userName}) {
    return (
      <div className="nav-container">
      <div className="nav-left">
       <span>Hi {userName}</span>
      </div>
      <div className="nav-right">
        <button>LogOut</button>
      </div>
    </div>
    ) 
}
