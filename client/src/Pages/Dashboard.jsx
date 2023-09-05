import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, ListGroup, Row, Spinner } from "react-bootstrap";

import { userAccount } from "../features/User/UserAction";
import EditProfilePic from "../components/EditProfilePic";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [picEdit,setPicEdit] = React.useState(false)

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userAccount());
    }
  }, [dispatch]);

  const { isError, isLoading, message, userData } = useSelector(
    (state) => state.User
  );

  const handlePicEdit = ()=>setPicEdit(!picEdit)

  // console.log(userData);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <p>Dashboard</p>
      {
        isError && <p style={{color:"red"}}>{message}</p>
      }
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Card>
              <img src={`http://localhost:3450${userData.file}`} alt="Profile Picture" />
              {
                picEdit ? <EditProfilePic handlePicEdit={handlePicEdit}/> : <Button onClick={handlePicEdit}>Edit Profile Picture</Button>
              }
              <Card.Body>
                <Card.Title>{userData.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: {userData.email}</ListGroup.Item>
                <ListGroup.Item>mobile: {userData.mobile}</ListGroup.Item>
                <ListGroup.Item>Role: {userData.role}</ListGroup.Item>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Reset Password</Card.Link>
                <Card.Link href="#">Logout</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
