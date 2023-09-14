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
import UpdateProfilePic from "../components/UpdateProfilePic";
import { userRest } from "../features/User/UserSlice";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picUpdate, setPicUpdate] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userAccount());
    }
  }, [dispatch]);

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3450/api/images/profilePic`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(response.data);
        setImageUrl(response.data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const { isError, isLoading, message, userData } = useSelector(
    (state) => state.User
  );

  const handlePicUpdate = () => setPicUpdate(!picUpdate);

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
              <div className="mb-4">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Uploaded"
                    width={"160px"}
                    height={"auto"}
                  />
                ) : (
                  <div>
                    <Button onClick={handlePicUpdate}>
                      Upload Profile Picture
                    </Button>
                  </div>
                )}
                {
                  picUpdate && <UpdateProfilePic handlePicUpdate={handlePicUpdate} />
                }
              </div>
            
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
