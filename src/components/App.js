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
import PageHeader from "./PageHeader";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Profile";
import Rankings from "./Rankings";
import Session from "./Session";

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
              <PageHeader pageTitle="SIGN UP" displaysProfileBtn={false} />
              <Login isLoginRoute={false} />
            </Route>
            <Route path="/login">
              <PageHeader pageTitle="LOGIN" displaysProfileBtn={false} />
              <Login isLoginRoute={true} />
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
