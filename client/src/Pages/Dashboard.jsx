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
import { imageShow } from "../features/Image/ImageAction";
import EditProfilePic from "../components/EditProfilePic";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picUpdate, setPicUpdate] = React.useState(false);
  const [editImage, setEditImage] = React.useState(false);

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userAccount());
      dispatch(imageShow());
    }
  }, [dispatch]);

  React.useEffect(() => {}, []);

  const { isError, isLoading, message, userData } = useSelector(
    (state) => state.User
  );

  const { dataImage } = useSelector((state) => state.image);

  // console.log(dataImage);

  const handlePicUpdate = () => setPicUpdate(!picUpdate);

  const handleEditImage = () => setEditImage(!editImage);

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
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  {dataImage && Object.keys(dataImage).length > 0 && (
                    <>
                      {!editImage && (
                        <img
                          src={dataImage.imageUrl}
                          alt="Uploaded"
                          width={"160px"}
                          height={"auto"}
                          className="mb-2"
                        />
                      )}
                    </>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="mb-2">
                    {dataImage && Object.keys(dataImage).length > 0 && (
                      <>
                        {editImage ? (
                          <EditProfilePic handleEditImage={handleEditImage} />
                        ) : (
                          <Button onClick={handleEditImage}>
                            Edit Profile Picture
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <div className="mb-1">
                    {dataImage &&
                      Object.keys(dataImage).length === 0 &&
                      (picUpdate ? (
                        <UpdateProfilePic handlePicUpdate={handlePicUpdate} />
                      ) : (
                        <div>
                          <Button onClick={handlePicUpdate}>
                            Upload Profile Picture
                          </Button>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
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
