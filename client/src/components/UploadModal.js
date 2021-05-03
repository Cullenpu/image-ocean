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

const UploadModal = ({ modal, toggle, setRepositoryImages }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [priv, setPrivate] = useState(false);
  const [infoText, setInfoText] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (file) {
      const formData = new FormData();

      // Update the formData object
      formData.append("image", file, file.name);
      formData.append("caption", caption);
      formData.append("private", priv);
      uploadImage(formData, setRepositoryImages);
      toggle(false);
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
              <Input type="checkbox" onChange={() => setPrivate(!priv)} />
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
