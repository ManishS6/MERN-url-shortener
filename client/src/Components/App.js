import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Dashboard from './Dashboard';
import Auth from './Auth';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </Router>
  );
}

export default App;
