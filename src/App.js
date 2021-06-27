import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Session from "./components/Session";

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <div className="header-container">
          <h1 className="header">TRAIN</h1>
          <hr />
        </div>
        <Switch>
          <Route path="/train">
            <Session />
          </Route>
          <Route path="/stats">
            <h1>Stats</h1>
          </Route>
          <Route path="/rankings">
            <h1>Rankings</h1>
          </Route>
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default App;
