import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userAccount, userLogout } from "../features/User/UserAction";
import EditProfilePic from "../components/EditProfilePic";
import { userRest } from "../features/User/UserSlice";
import ImageViewer from "../components/ImageViewer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picEdit, setPicEdit] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userAccount());
    }
  }, [dispatch]);

  const { isError, isLoading, message, userData } = useSelector(
    (state) => state.User
  );

  const handlePicEdit = () => setPicEdit(!picEdit);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError && message == "Invalidate Token") {
    navigate("/login");
  }

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
    dispatch(userRest());
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <p>Dashboard</p>
            {isError && <p style={{ color: "red" }}>{message}</p>}
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card>
             <ImageViewer />
              {picEdit ? (
                <EditProfilePic handlePicEdit={handlePicEdit} />
              ) : (
                <Button onClick={handlePicEdit}>Edit Profile Picture</Button>
              )}
              <Card.Body>
                <Card.Title>{userData.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: {userData.email}</ListGroup.Item>
                <ListGroup.Item>mobile: {userData.mobile}</ListGroup.Item>
                <ListGroup.Item>Role: {userData.role}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <div className="mb-3">
                      <Link to={"/userUpdate"}>Edit User Details</Link>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <div className="mb-3">
                      <Link to={"/resetPassword"}>Reset Password</Link>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} xxl={6}>
                    <div className="mb-3">
                      <Card.Link onClick={handleLogout}>Logout</Card.Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
