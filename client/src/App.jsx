// import React from 'react'
import Container from "react-bootstrap/esm/Container";
import "./App.css";
import RegisterForm from "./components/RegisterForm";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
function App() {
  return (
    <Container fluid="md">
      <Row>
        <Col sm="12">
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
