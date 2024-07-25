import React from "react";
import {
  Col,
  Row,
  Form,
  InputGroup,
  Button,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";
// import ToastMessage from "../uitles/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { userLogout, userRegister } from "../features/User/UserAction";
import { Link, useNavigate } from "react-router-dom";

import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { userRest } from "../features/User/UserSlice";
import { validateEmail, validateNumber } from "../uitles/validate";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, isLoading, message } = useSelector((state) => state.User);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState({});
  const [showPassword, settShowPassword] = React.useState(false);

  let formErr = {};

  const handleFormError = () => {
    if (name.trim().length === 0) {
      formErr.name = "Name is required";
    }
    if (email.trim().length === 0 || !validateEmail(email)) {
      formErr.email = "Email address is required";
    }
    if (mobile.toString().trim().length !== 10 || !validateNumber(mobile)) {
      formErr.mobile = "Mobile Number is required 10 character";
    }
    if (password.toString().trim().length < 8 || password.toString().trim().length > 128) {
      formErr.password = "Password is required between 8 to 128 character";
    }
  };

  const resolve = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setFormError({});
    settShowPassword(false);
    navigate("/login");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();

    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      console.log(formErr);
    } else {
      const formData = {
        name,
        email,
        mobile,
        password,
      };
      const req = {
        formData,
        resolve,
      };
      dispatch(userRegister(req));
    }
  };

  console.log(formError)

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card>
            <Card.Title className="mb-3 ">User Register</Card.Title>
            <Form onSubmit={handleFormSubmit}>
              {isError && <p style={{ color: "red" }}>{message}</p>}
              <Row>
                <Col xs={12} md={6} lg={6}>
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
                <Col xs={12} md={6} lg={6}>
                  <Form.Group className="mb-2 text-start" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        delete formError.email;
                      }}
                    />
                    {Object.keys(formError).length > 0 && formError.email && (
                      <small style={{ color: "red" }}>{formError.email}</small>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={6}>
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
                    {Object.keys(formError).length > 0 && formError.mobile && (
                      <small style={{ color: "red" }}>{formError.mobile}</small>
                    )}
                  </Form.Group>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <Form.Group className="mb-2 text-start" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          delete formError.password;
                        }}
                      />
                      <InputGroup.Text
                        id="basic-addon2"
                        onClick={() => settShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <div>
                            <BsFillUnlockFill />
                          </div>
                        ) : (
                          <div>
                            <BsFillLockFill />
                          </div>
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                    {Object.keys(formError).length > 0 &&
                      formError.password && (
                        <small style={{ color: "red" }}>
                          {formError.password}
                        </small>
                      )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="w-100 mt-3">
                <Button type="submit" variant="success" className="w-75">
                  submit
                </Button>
              </div>
            </Form>
            <p className="my-3">
              Alread have registed
              <Link to="/login" onClick={()=>{
                  dispatch(userLogout());
                  dispatch(userRest());
                }}> Login</Link>
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
