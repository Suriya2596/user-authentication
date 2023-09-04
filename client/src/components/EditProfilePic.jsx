import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { userProfilePic } from "../features/User/UserAction";

const EditProfilePic = ({ handlePicEdit }) => {
  const [file, setFile] = React.useState("");
  const dispatch = useDispatch()

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // console.log(formData.getAll("file")); // Check if the file is added to formData
      dispatch(userProfilePic(formData))
    }
    resolve()
  };

  const resolve = () => {
    handlePicEdit();
    setFile("");
  };

  return (
    <form onSubmit={handleFormSubmit}  action="/api/user/profilePic" method="post" encType="multipart/form-data">
      <div>
        <Form.Group controlId="formFile" className="mb-2 text-start">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
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
