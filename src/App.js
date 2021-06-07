import "./App.css";
import Nav from "./components/Nav";
import Session from "./components/Session";

function App() {
  return (
    <div className="main-wrapper">
      <h1 className="main-header">SHOT TRACKER</h1>
      <Session />
      <Nav />
    </div>
  );
}

export default App;
