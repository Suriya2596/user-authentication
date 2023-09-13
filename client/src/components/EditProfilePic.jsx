import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import axios from "axios";
// import { useDispatch } from "react-redux";

const EditProfilePic = ({ handlePicEdit }) => {
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", title);
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
    handlePicEdit();
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
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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

EditProfilePic.propTypes = {
  handlePicEdit: PropTypes.func,
};

export default EditProfilePic;
