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
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
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
              <Redirect to="/train" />
            </Route>

            {/* Auth routes */}
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

            {/* Auth protected routes */}
            <PrivateRoute
              path="/profile"
              component={Profile}
              pageTitle="PROFILE"
            ></PrivateRoute>
            <PrivateRoute
              path="/train"
              component={Session}
              pageTitle="TRAIN"
            ></PrivateRoute>
            <PrivateRoute
              path="/history"
              component={History}
              pageTitle="HISTORY"
            ></PrivateRoute>
            <PrivateRoute
              path="/rankings"
              component={Rankings}
              pageTitle="RANKINGS"
            ></PrivateRoute>
          </Switch>
          <Nav />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
