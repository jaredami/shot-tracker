import "./App.css";
import Nav from "./components/Nav";
import Session from "./components/Session";

function App() {
  return (
    <div className="main-wrapper">
      <div className="header-container">
        <h1 className="header">TRAIN</h1>
        <hr />
      </div>
      <Session />
      <Nav />
    </div>
  );
}

export default App;
