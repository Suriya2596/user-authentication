import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
// import { useDispatch } from "react-redux";

const UpdateProfilePic = ({ handlePicUpdate }) => {
  const [image, setImage] = React.useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      try {
        await axios.post("http://127.0.0.1:3450/api/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization:localStorage.getItem("token")
          },
        });
        // Handle success, e.g., show a success message or redirect to another page
        resolve();
        alert("Image uploaded successfully");
      } catch (error) {
        // Handle error, e.g., show an error message to the user
        console.error("Error uploading image:", error);
      }
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
