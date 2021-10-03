import './App.css';
import Home from "./pages/home";
import Profile from "./pages/profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch,
  Route,} from  "react-router-dom";
import LoginForm from './components/authentication/login/loginform';
import ProtectedRoutes from './components/protectedroutes/protectedroutes';
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import ProfileUpdate from './pages/profileupdate';


function App() {
  return (
    <Switch>
       <Route exact path="/login">
      <LoginForm/>
        </Route>
        {/*
        <Route exact path="/">
      <Home/>
        </Route>
        <Route exact path="/profile/:username">
      <Profile/>
        </Route>
        */}
  
   <ProtectedRoutes exact path = "/"
    component = {
      Home
    } />
        <ProtectedRoutes exact path="/profile/update"
      component={ProfileUpdate} />
      <ProtectedRoutes exact path="/profile/:username"
      component={Profile} />
   
      
    </Switch>
  );
}

export default App;
