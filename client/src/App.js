import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import Googlelogin from './component/login';
import ToDoPAge from './pages/taskPage'

function App() {
  const [userID, setID] = useState(null);
  const [userName, setName] = useState('');

  useEffect(() => {
    fetch('/api/v1/auth')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(({ id, name }) => {
        setID(id);
        setName(name);
      })
      .catch(() => {
        setID(null);
        setName('');
      });
  })

  return (
    <div className="App">
      <Router>
        <Route path="/login">
          <Googlelogin />
        </Route>
        {userID != null ? (<Route exact path="/">
          <ToDoPAge />
        </Route>) : (<Redirect to="/login" />
          )}

      </Router>
    </div>
  );
}

export default App;
