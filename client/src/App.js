import { useState, useEffect } from "react";
import Login from "./pages/login";
import AppNav from "./components/AppNav";
import Repository from "./pages/Repository";
import "./App.css";

import { getRepositoryImages } from "./utils";

function App() {
  const [id, setID] = useState(null);
  const [repository, setRepository] = useState(true);
  const [repositoryImages, setRepositoryImages] = useState([]);
  const [personalImages, setPersonalImages] = useState([]);

  useEffect(() => {
    // Set the images array on load
    getRepositoryImages(setRepositoryImages);
  }, []);

  return (
    <div className="App">
      {id ? (
        <AppNav
          setRepository={setRepository}
          setRepositoryImages={setRepositoryImages}
        >
          {repository ? <Repository images={repositoryImages} /> : null}
        </AppNav>
      ) : (
        <Login setID={setID} />
      )}
    </div>
  );
}

export default App;
