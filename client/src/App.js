import { useState, useEffect } from "react";
import Login from "./pages/login";
import AppNav from "./components/AppNav";
import ImageGrid from "./components/ImageGrid";
import "./App.css";

import { getGalleryImages, getPersonalImages } from "./utils";

function App() {
  const [id, setID] = useState(null);
  const [gallery, setGallery] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const [personalImages, setPersonalImages] = useState([]);

  useEffect(() => {
    // Set the images array on load
    getGalleryImages(setGalleryImages);
    getPersonalImages(id, setPersonalImages);
  }, [id]);

  return (
    <div className="App">
      {id ? (
        <AppNav
          setGallery={setGallery}
          id={id}
          setID={setID}
          setGalleryImages={setGalleryImages}
          setPersonalImages={setPersonalImages}
        >
          {gallery ? (
            <ImageGrid images={galleryImages} header="All Images" />
          ) : (
            <ImageGrid images={personalImages} header="My Images" />
          )}
        </AppNav>
      ) : (
        <Login setID={setID} />
      )}
    </div>
  );
}

export default App;
