import React from "react";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { imageCreate } from "../features/Image/ImageAction";
// import { useDispatch } from "react-redux";

const UpdateProfilePic = ({ handlePicUpdate }) => {
  const dispatcch = useDispatch()
  const [image, setImage] = React.useState(null);
  const [formError,setFormError] = React.useState({})

  const handleFormError = ()=>{
    if(!image){
      setFormError({image:"Plesae select the image"})
    }
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    handleFormError()
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
            onChange={(e) => {
              setImage(e.target.files[0])
              setFormError({})
            }}
          />
          {
            formError && Object.keys(formError).length>0 && formError.image && <p className="my-2" style={{color:"red"}}>{formError.image}</p>
          }
          <div className="d-flex my-2">
            <Button type="submit" variant="success">Save</Button>
            <Button onClick={handlePicUpdate} className="mx-2" variant="secondary">Cancle</Button>
          </div>
        </Form.Group>
      </div>
    </form>
  );
};

UpdateProfilePic.propTypes = {
  handlePicUpdate: PropTypes.func,
};

export default UpdateProfilePic;
