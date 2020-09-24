import React from "react";
import { GoogleLogin } from "react-google-login";
import './login.css';
import TaskImg from '../assets/work.png';

const failureResponse = (response) => {
  console.log("error", response);
};

function Googlelogin({ setData }) {
  const successResponse = ({ tokenId, googleId }) => {
    fetch("/api/v1/login/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId, googleId }),
    })
      .then(() => setData(true))
      .catch(console.log);
  };
  return (
    <div className="logincontainer">
      <div className="loginLeft">
        <img alt="task" src={TaskImg} />
        </div>
        <div className="loginRight">
          <h2>Login by google account</h2>
        <GoogleLogin
        clientId="350966115127-cs3q5j21nlacr1hg3njv3v8co74q23ab.apps.googleusercontent.com"
        className="login-btn"
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
        </div>
     
    </div>
  );
}

export default Googlelogin;
