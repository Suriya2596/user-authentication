import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { imageUpdate } from "../features/Image/ImageAction";
// import { useDispatch } from "react-redux";

const EditProfilePic = ({ handleEditImage }) => {
  const dispatcch = useDispatch();
  const [image, setImage] = React.useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const req = {
        image,
        resolve,
      };
      dispatcch(imageUpdate(req));
    }
  };

  const resolve = () => {
    handleEditImage();
    setImage(null);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      action="/api/user/profilePic"
      method="put"
      encType="multipart/form-data"
    >
      <div>
        <Form.Group controlId="image" className="mb-2 text-start">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="d-flex my-2">
            <Button type="submit" variant="success">Save</Button>
            <Button onClick={handleEditImage} className="mx-2" variant="secondary">Cancle</Button>
          </div>
        </Form.Group>
      </div>
    </form>
  );
};

EditProfilePic.propTypes = {
  handleEditImage: PropTypes.func,
};

export default EditProfilePic;
