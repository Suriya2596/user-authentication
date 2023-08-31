import axios from "axios";
import React from "react";
import {
  Col,
  Row,
  Form,
  InputGroup,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import ToastMessage from "../uitles/ToastMessage";

const RegisterForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState("");
  const [formError, setFormError] = React.useState({});
  const [showPassword, settShowPassword] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [data,setData] = React.useState({});

  let formErr = {};

  const verifyEmail = (value) => {
    var emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
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
    if (email.trim().length === 0 || !verifyEmail(email)) {
      formErr.email = "Email address is required";
    }
    if (mobile.toString().trim().length !== 10 || !verifyNumber(mobile)) {
      formErr.mobile = "Mobile Number is required 10 character";
    }
    if (password.trim().length < 8 || password.trim().length > 128) {
      formErr.password = "Password is required between 8 to 128 character";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();

    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
      console.log(formErr);
    } else {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("password", password);
      console.log(file);
      axios
        .post("http://localhost:3450/api/user/register", formData)
        .then((response) => {
          console.log(response);
          if(response.data && response.data.status==="fail"){
            setShow(true)
            setData(response.data)
          }
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const resolve = () => {
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setFile("");
    setFormError({});
    settShowPassword(false);
  };
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
          <Card>
            <Card.Title className="mb-3 ">User Register</Card.Title>
            <Form onSubmit={handleFormSubmit}>
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
                        *
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
              <div>
                <Form.Group controlId="formFile" className="mb-2 text-start">
                  <Form.Label>Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </div>
              <div className="w-100 mt-3">
                <Button type="submit" variant="success" className="w-75">
                  submit
                </Button>
              </div>
            </Form>
            <p className="my-3">
              Alread have registed
              <a> Login</a>
            </p>
          </Card>
        </Col>
      </Row>
      {
        show && <ToastMessage show={show} setShow={setShow} heading={data.status} messsage={data.messsage}/>
      }
    </Container>
  );
};

export default RegisterForm;
