import React from "react";
import "./nav.css";

export default function ({ userName, setData }) {
  const logout = async () => {
    try {
      fetch(`/api/v1/logout`).then(() => setData(false));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="nav-container">
      <div className="nav-left">
        <span>Hi {userName}</span>
      </div>
      <div className="nav-right">
        <button type="button" onClick={logout}>
          LogOut
        </button>
      </div>
    </div>
  );
}
