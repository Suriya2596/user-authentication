import axios from "axios";
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";

const RegisterForm = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [file, setFile] = React.useState("");
  const [formError, setFormError] = React.useState({});

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
    if (mobile.toString().trim().length === 0 || !verifyNumber(mobile)) {
      formErr.mobile = "Mobile Number is required";
    } else if (mobile.trim().length !== 10) {
      formErr.password = "Mobile Number is required 10 character";
    }
    if (password.trim().length === 0) {
      formErr.password = "Password is required";
    } else if (password.trim().length < 8 || password.trim().length > 128) {
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
        .post("http://localhost:3450/api/user", formData)
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
    setName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setFile("");
    setFormError({});
  };
  console.log();
  return (
    <Form onSubmit={handleFormSubmit}>
      <div>
        <Form.Group as={Row} className="mb-1" controlId="name">
          <Form.Label column sm="4">
            User Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                delete formError.name;
              }}
            />
          </Col>
          {Object.keys(formError).length > 0 && formError.name && (
            <p style={{ color: "red" }}>{formError.name}</p>
          )}
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} className="mb-1" controlId="email">
          <Form.Label column sm="4">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                delete formError.email;
              }}
            />
          </Col>
          {Object.keys(formError).length > 0 && formError.email && (
            <p style={{ color: "red" }}>{formError.email}</p>
          )}
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} className="mb-1" controlId="mobile">
          <Form.Label column sm="4">
            Mobile
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="number"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                delete formError.mobile;
              }}
            />
          </Col>

          {Object.keys(formError).length > 0 && formError.mobile && (
            <p style={{ color: "red" }}>{formError.mobile}</p>
          )}
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} className="mb-1" controlId="password">
          <Form.Label column sm="4">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                delete formError.password;
              }}
            />
          </Col>
          {Object.keys(formError).length > 0 && formError.password && (
            <p style={{ color: "red" }}>{formError.password}</p>
          )}
        </Form.Group>
      </div>
      <div>
        <Form.Group as={Row} controlId="formFile" className="mb-1">
          <Form.Label column sm="4">
            Profile Picture
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Col>
        </Form.Group>
      </div>
      <div>
        <Button type="submit" variant="success">
          submit
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
