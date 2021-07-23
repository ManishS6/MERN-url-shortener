import React, {useState, useEffect } from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import axios from 'axios';
import Dashboard from './Dashboard';
import Auth from './Auth';
import userContext from './userContext';


function App() {
  const [ userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLogedIn = async () => {
      let token = localStorage.getItem("auth-token")
      if(token==null){
        localStorage.setItem("auth-token","")
        token = ""
      }
      console.log('Upon Refresh this is running')
      const tokenResponse = await axios.post('http://localhost:5000/auth/tokenIsValid', null, {headers: {"x-auth-token": token}})
      if(tokenResponse.data){
        const userRes = await axios.get('http://localhost:5000/auth',{
          headers: {"x-auth-token": token}
        })
        console.log(userRes.data.username)
        setUserData({
          token,
          user: userRes.data.username
        })
      } else {
        console.log('tokenResponse had no data')
      }
    }
    checkLogedIn()
  }, [])

  return (
    <Router>
      <userContext.Provider value={{ userData, setUserData }}>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/auth" component={Auth} />
        </Switch>
      </userContext.Provider>
    </Router>
  );
}

export default App;
