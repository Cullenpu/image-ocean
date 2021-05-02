import { useState } from "react";
import Login from "./pages/login";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? null : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
