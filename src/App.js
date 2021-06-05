import "./App.css";
import Session from "./components/Session";

function App() {
  return (
    <div>
      <h1>Shot Tracker</h1>
      {/* <div className="buttons-container">
        <button>Miss</button>
        <button>Make</button>
      </div> */}
      <Session />
    </div>
  );
}

export default App;
