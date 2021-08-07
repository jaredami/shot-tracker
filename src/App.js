import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import History from "./components/History";
import Nav from "./components/Nav";
import Rankings from "./components/Rankings";
import Session from "./components/Session";

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <Switch>
          <Route exact path="/">
            <Redirect to="/train" />
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
    </Router>
  );
}

export default App;
