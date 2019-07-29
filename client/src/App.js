import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/create" component={Create} />
          <Route exact path="/friends" component={Friends} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
