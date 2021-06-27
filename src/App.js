import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Session from "./components/Session";

function App() {
  return (
    <Router>
      <div className="main-wrapper">
        <Switch>
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
          </Route>
          <Route path="/rankings">
            <div className="header-container">
              <h1 className="header">RANKINGS</h1>
              <hr />
            </div>
          </Route>
        </Switch>
        <Nav />
      </div>
    </Router>
  );
}

export default App;
