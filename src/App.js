import './App.css';
import Home from "./pages/home";
import Profile from "./pages/profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch,
  Route,} from  "react-router-dom";

function App() {
  
  return (
    <Switch>
      <Route exact path="/">
      <Home/>
        </Route>
        <Route exact path="/profile/:username">
      <Profile/>
        </Route>
    </Switch>
  );
}

export default App;
