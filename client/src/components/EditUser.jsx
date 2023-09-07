import React from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userAccount, userUpdate } from "../features/User/UserAction";
import { Link, useNavigate } from "react-router-dom";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(userAccount());
  }, [dispatch]);

  const { isError, isLoading, message, userData } = useSelector(
    (state) => state.User
  );

  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [formError, setFormError] = React.useState({});

  let formErr = {};

  React.useEffect(() => {
    if (userData) {
      setName(userData.name);
      setMobile(userData.mobile);
    }
  }, [userData]);

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

  const handleFormError = () => {
    if (name.trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (mobile.toString().trim().length !== 10 || !verifyNumber(mobile)) {
      formErr.mobile = "Mobile Number is required 10 character";
    }
  };

  const resolve = () => {
    setFormError({});
    navigate("/");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();

    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
    } else {
      const formData = {
        name,
        mobile,
      };
      const req = {
        formData,
        resolve,
      };
      dispatch(userUpdate(req));
    }
  };

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container className="w-100">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card>
            <Card.Title className="mb-3 ">Edit Details</Card.Title>
            <div className="mb-3">
            <Link to="/">Back to Home</Link>
            </div>
            <Form onSubmit={handleFormSubmit}>
              {isError && <p style={{ color: "red" }}>{message}</p>}
              <Container>
                <Row>
                  <Col xs={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Group className="mb-2 text-start" controlId="name">
                      <Form.Label>User Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          delete formError.name;
                        }}
                      />
                      {Object.keys(formError).length > 0 && formError.name && (
                        <small style={{ color: "red" }}>{formError.name}</small>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12}>
                    <Form.Group className="mb-2 text-start" controlId="mobile">
                      <Form.Label>Mobile</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Mobile Number"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          delete formError.mobile;
                        }}
                      />
                      {Object.keys(formError).length > 0 &&
                        formError.mobile && (
                          <small style={{ color: "red" }}>
                            {formError.mobile}
                          </small>
                        )}
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <div className="w-100 mt-3">
                <Button type="submit" variant="success" className="w-75">
                  Submit
                </Button>
              </div>
            </Form>
            <div className="my-3">
              <Link to="/resetPassword"> Reset Password</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUser;
