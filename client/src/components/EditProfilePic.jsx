import React from "react";
import { Form } from "react-bootstrap";

const EditProfilePic = () => {
  const [file, setFile] = React.useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <Form.Group controlId="formFile" className="mb-2 text-start">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
      </div>
    </form>
  );
};

export default EditProfilePic;
