import { Row, Col } from "reactstrap";

const ImageGrid = ({ images }) => {
  // 4 images per row
  const imgPerRow = 4;
  const numRows = Math.ceil(images.length / imgPerRow);

  return (
    <div>
      {Array(numRows)
        .fill()
        .map((_, rowIndex) => {
          // Use map to create a new row
          return (
            <Row key={rowIndex}>
              {images
                .slice(rowIndex * imgPerRow, (rowIndex + 1) * imgPerRow)
                .map((image, colIndex) => {
                  return (
                    <Col>
                      <img
                        key={colIndex}
                        src={`data:${
                          image.img.contentType
                        };base64,${Buffer.from(image.img.data).toString(
                          "base64"
                        )}`}
                      />
                    </Col>
                  );
                })}
            </Row>
          );
        })}
    </div>
  );
};

export default ImageGrid;
