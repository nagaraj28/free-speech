import './App.css';
import Home from "./pages/home";
import Profile from "./pages/profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch,
  Route,} from  "react-router-dom";
import LoginForm from './components/authentication/login/loginform';
import SignUpForm from "./components/authentication/login/signupform"
import ProtectedRoutes from './components/protectedroutes/protectedroutes';
import { useEffect } from 'react';
import {useDispatch} from "react-redux";
import ProfileUpdate from './pages/profileupdate';
import {validatetoken,useAuthenticationDetails} from "./components/authentication/authenticationSlice";
import {useHistory} from "react-router-dom";


function App() {
 
  // if(loadinguserid===false&&loggeduserid&&loggeduserid!=="wrong credentials,please check!"&&loggeduserid!=="error logging in"&&loggeduserid!=="processing")
//history.push('/');

const {loggeduserid,loadinguserid,tokenGenerated} = useAuthenticationDetails();
const history = useHistory();
const dispatch = useDispatch();
useEffect(()=>{
        const token = localStorage.getItem('x-auth-token');
        if(loadinguserid===false&&loggeduserid&&loggeduserid!=="wrong credentials,please check!"&&loggeduserid!=="error logging in"&&loggeduserid!=="processing")
        history.push('/');
       // console.log(localStorage.getItem('x-auth-token'));
       else if(token!=="null"&&token&&token!==false&&token.length>0){
       // console.log(`token bearer${token}`);
      dispatch(validatetoken());
      }
},[loggeduserid,tokenGenerated]);

  return (
    <Switch>
       <Route exact path="/login">
      <LoginForm/>
        </Route>
        <Route exact path="/signup">
      <SignUpForm/>
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
