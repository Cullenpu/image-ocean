import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { uploadImage } from "../utils";

const UploadModal = ({
  modal,
  toggle,
  id,
  setGalleryImages,
  setPersonalImages,
}) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [priv, setPrivate] = useState(false);
  const [infoText, setInfoText] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (file) {
      const regex = new RegExp(".*(.jpg|.jpeg|.png|.gif|.svg)$");
      // Validate image file
      if (regex.test(file.name)) {
        // Create reader object to read image and get original height and width for use in the image grid
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            // Get image height and width
            const width = img.naturalWidth;
            const height = img.naturalHeight;

            // FormData object used in the request
            const formData = new FormData();
            formData.append("image", file, file.name);
            formData.append("caption", caption);
            formData.append("private", priv);
            formData.append("width", width);
            formData.append("height", height);
            uploadImage(id, formData, setGalleryImages, setPersonalImages);
            toggle(false);
          };
        };
      } else {
        setInfoText("Invalid image file");
      }
    } else {
      setInfoText("No file selected");
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Upload Image</ModalHeader>
      <ModalBody>
        <Form encType="multipart/form-data">
          <FormGroup>
            <Label for="caption">Image Caption</Label>
            <Input
              id="caption"
              name="caption"
              onChange={(e) => setCaption(e.target.value)}
              rows="2"
              placeholder="Caption"
            />
          </FormGroup>
          <FormGroup>
            <Label>Upload Image</Label>
            <Input
              type="file"
              onChange={onFileChange}
              id="image"
              name="image"
              required
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={(e) => setPrivate(e.target.checked)}
              />
              Private
            </Label>
          </FormGroup>
        </Form>
        <h6>{infoText}</h6>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" onClick={onFileUpload}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UploadModal;
