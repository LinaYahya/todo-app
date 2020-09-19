import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './App.css';
import Googlelogin from './component/login';
import ToDoPAge from './pages/taskPage';
import Nav from './component/Nav'

function App() {
  const [userID, setID] = useState(null);
  const [userName, setName] = useState('');
  const [data, setData] = useState(false);

  const checkAuth = () => {
    fetch('/api/v1/auth')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(({ id, name }) => {
        setID(id);
        setName(name);
        setData(true);
      })
      .catch(() => {
        setID(null);
        setName('');
      });
  }

  useEffect(() => {
    checkAuth();
  }, [])


  return (

    <div className="App">
      <Router>
      <Route path="*" render={({ history }) => <Nav history={history} userName={userName} />} />

        <Switch>
          {(data) ? <Route path="/"><ToDoPAge userName={userName} /></Route>
            :
            <Route path="/login">
              <Googlelogin />
            </Route>
          }
        </Switch>
      </Router>
    </div>
  );
}

export default App;
