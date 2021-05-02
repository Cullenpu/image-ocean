import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    console.log(file);
    const formData = new FormData();

    // Update the formData object
    formData.append("image", file, file.name);
    console.log(formData);
    axios.post("http://localhost:5000/images/", formData);
  };

  return (
    <div>
      <h1>Upload image</h1>
      <div>
        <form action="/" method="POST" encType="multipart/form-data">
          <div>
            <label>Image Title</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value=""
              name="name"
              required
            />
          </div>
          <div>
            <label for="desc">Image Description</label>
            <textarea
              id="desc"
              name="pesc"
              value=""
              rows="2"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              onChange={onFileChange}
              id="image"
              name="image"
              value=""
              required
            />
          </div>
          <div>
            <button type="submit" onClick={onFileUpload}>
              Submit
            </button>
          </div>
        </form>
      </div>
      <h1>Uploaded Images</h1>
    </div>
  );
};

export default Upload;
