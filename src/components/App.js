import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "./App.css";
import History from "./History";
import Login from "./Login";
import Nav from "./Nav";
import Rankings from "./Rankings";
import Session from "./Session";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="main-wrapper">
          <Switch>
            <Route exact path="/">
              <Redirect to="/signup" />
            </Route>
            <Route path="/signup">
              <div className="header-container">
                <h1 className="header">SIGN UP</h1>
                <hr />
              </div>
              <Signup />
            </Route>
            <Route path="/login">
              <div className="header-container">
                <h1 className="header">LOG IN</h1>
                <hr />
              </div>
              <Login />
            </Route>
            <Route path="/train">
              <div className="header-container">
                <h1 className="header">TRAIN</h1>
                <hr />
              </div>
              <Session />
            </Route>
            <Route path="/history">
              <div className="header-container">
                <h1 className="header">HISTORY</h1>
                <hr />
              </div>
              <History />
            </Route>
            <Route path="/rankings">
              <div className="header-container">
                <h1 className="header">RANKINGS</h1>
                <hr />
              </div>
              <Rankings />
            </Route>
          </Switch>
          <Nav />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
