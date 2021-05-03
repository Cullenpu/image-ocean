import React from "react";
import ImageGrid from "../components/ImageGrid";

const Repository = ({ images }) => {
  return (
    <div>
      <h1>All Images</h1>
      <ImageGrid images={images} />
    </div>
  );
};

export default Repository;
