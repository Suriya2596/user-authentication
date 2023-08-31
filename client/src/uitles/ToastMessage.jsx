// import React from 'react';
// import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';

function ToastMessage({show,setShow,heading,messsage}) {
  // const [show, setShow] = React.useState(false);

  return (
    <Row>
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">{heading}</strong>
          </Toast.Header>
          <Toast.Body>{messsage}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}
ToastMessage.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  heading: PropTypes.string,
  messsage: PropTypes.string,
};
export default ToastMessage;