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

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formError, setFormError] = React.useState({});
  const [showPassword, settShowPassword] = React.useState(false);

  let formErr = {};

  const verifyEmail = (value) => {
    var emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };

  const handleFormError = () => {
    if (email.trim().length === 0 || !verifyEmail(email)) {
      formErr.email = "Email address is required";
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
      formData.append("email", email);
      formData.append("password", password);
      axios
        .post("http://localhost:3450/api/user/login", formData)
        .then((response) => {
          console.log(response);
          resolve();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const resolve = () => {
    setEmail("");
    setPassword("");
    setFormError({});
    settShowPassword(false);
  };
  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card>
              <Card.Title className="mb-3 ">User Login</Card.Title>
              <Form onSubmit={handleFormSubmit}>
                <Row>
                  <Col xs={12} md={12} lg={12}>
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
                        <small style={{ color: "red" }}>
                          {formError.email}
                        </small>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={12} lg={12}>
                    <Form.Group
                      className="mb-2 text-start"
                      controlId="password"
                    >
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
                <div className="w-100 mt-3">
                  <Button type="submit" variant="success" className="w-75">
                    submit
                  </Button>
                </div>
              </Form>
              <p className="my-3">
                Not been registed
                <a> Register Now</a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginForm;
