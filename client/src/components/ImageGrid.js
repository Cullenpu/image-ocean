import React, { useState, useEffect, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const ImageGrid = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(
      // Reverse order of images array so that they are shown in chronological order
      images.reverse().map((image) => {
        return {
          width: image.width,
          height: image.height,
          caption: image.caption,
          src: `data:${image.img.contentType};base64,${Buffer.from(
            image.img.data
          ).toString("base64")}`,
        };
      })
    );
  }, [images]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map((photo) => ({
                ...photo,
                srcset: photo.srcSet,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default ImageGrid;
