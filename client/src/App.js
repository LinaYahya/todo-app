import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import Googlelogin from "./features/login";
import ToDoPAge from "./pages/taskPage";

function App() {
  const [userName, setName] = useState("");
  const [data, setData] = useState(false);

  const checkAuth = () => {
    fetch("/api/v1/auth")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(({ name }) => {
        setName(name);
        setData(true);
      })
      .catch(() => {
        setName("");
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              data ? (
                <ToDoPAge userName={userName} setData={setData} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !data ? <Googlelogin setData={setData} /> : <Redirect to="/" />
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
