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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userResetPassword } from "../features/User/UserAction";
import { BsFillLockFill, BsFillUnlockFill } from "react-icons/bs";
import { userRest } from "../features/User/UserSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [formError, setFormError] = React.useState({});
  const [showPassword, settShowPassword] = React.useState(false);

  let formErr = {};

  const { isError, message } = useSelector((state) => state.User);

  const handleFormError = () => {
    if (
      password.toString().trim().length < 8 ||
      password.toString().trim().length > 128
    ) {
      formErr.password = "Password is required between 8 to 128 character";
    }
    if (
      confirmPassword.toString().trim().length < 8 ||
      confirmPassword.toString().trim().length > 128
    ) {
      formErr.confirmPassword =
        "Password is required between 8 to 128 character";
    }
    if (password !== confirmPassword) {
      formErr.confirmationPWD = "Password and Confrim Password should be same";
    }
  };

  const resolve = () => {
    setPassword("");
    setConfirmPassword("");
    setFormError({});
    settShowPassword(false);
    if(localStorage.getItem("token")){
        localStorage.removeItem("token")
        navigate("/login")
    }
    dispatch(userRest())
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFormError();

    if (Object.keys(formErr).length > 0) {
      setFormError(formErr);
    } else {
      const formData = { password };
      const req = {
        formData,
        resolve,
      };
      dispatch(userResetPassword(req));
    }
  };

  return (
    <>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card>
              <Card.Title className="mb-3 ">User Reset Password</Card.Title>
              <Link to="/">Back to Home</Link>
              {isError && (
                <div>
                  <p style={{ color: "red" }}>{message}</p>
                </div>
              )}
              <Form onSubmit={handleFormSubmit}>
                <Row>
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
                            delete formError.confirmationPWD
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
                  <Col xs={12} md={12} lg={12}>
                    <Form.Group
                      className="mb-2 text-start"
                      controlId="confirmPassword"
                    >
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          autoComplete="off"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            delete formError.confirmPassword;
                            delete formError.confirmationPWD
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
                        formError.confirmPassword && (
                          <small style={{ color: "red" }}>
                            {formError.confirmPassword}
                          </small>
                        )}
                        {Object.keys(formError).length > 0 &&
                        formError.confirmationPWD && (
                          <small style={{ color: "red" }}>
                            {formError.confirmationPWD}
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
