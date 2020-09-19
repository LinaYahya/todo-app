import React from "react";
import { GoogleLogin } from "react-google-login";
import "../App.css";
import { useHistory } from "react-router-dom";

const failureResponse = (response) => {
  console.log("error", response);
};

function Googlelogin() {
  const history = useHistory();
  const successResponse = ({ tokenId, googleId }) => {
    fetch("/api/v1/login/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId, googleId }),
    })
      .then(() => history.push("/"))
      .catch(console.log);
  };
  return (
    <div className="logincontainer">
      <GoogleLogin
        clientId="350966115127-cs3q5j21nlacr1hg3njv3v8co74q23ab.apps.googleusercontent.com"
        className="login-btn"
        onSuccess={successResponse}
        onFailure={failureResponse}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}

export default Googlelogin;
