import React from 'react';
import { GoogleLogin } from 'react-google-login';
import  '../App.css';

// import { config } from 'dotenv/types';
// import  {REACT_APP_CLIENTID} from '../.env';
// require('env2')('config.env');

// require('dotenv');

// require('dotenv').config()
// if (process.env.NODE_ENV !== 'production') {
//   analytics.disable();
// }
const successResponse = ({tokenId}) => {

	// axios.post('/login/google', { tokenId }).then(console.log).catch(console.log);
};
function Googlelogin () {
console.log( JSON.stringify(process.env.REACT_APP_CLIENTID), 'hi')
  return (
    <div className="logincontainer">
    <GoogleLogin
    clientId={process.env.CLIENTID}
    className="login-btn"
    onSuccess={successResponse}
	  // onFailure={failureResponse}
    cookiePolicy={'single_host_origin'}
    isSignedIn={true}

    />
</div>
  )
}

export default Googlelogin;


