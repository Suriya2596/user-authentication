import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { imageCreate } from "../features/Image/ImageAction";
// import { useDispatch } from "react-redux";

const UpdateProfilePic = ({ handlePicUpdate }) => {
  const dispatcch = useDispatch()
  const [image, setImage] = React.useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const req = {
        image,resolve
      }
      dispatcch(imageCreate(req))
    }
  };

  const resolve = () => {
    handlePicUpdate();
    setImage(null);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      action="/api/user/profilePic"
      method="post"
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
          <Button type="submit">Save</Button>
        </Form.Group>
      </div>
    </form>
  );
};

UpdateProfilePic.propTypes = {
  handlePicUpdate: PropTypes.func,
};

export default UpdateProfilePic;
