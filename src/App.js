import axios from "axios";

import { useEffect, useRef, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./App.css";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [data, setdata] = useState([]);
  const name = useRef();
  const fathername = useRef();
  const cardno = useRef();
  const sex = useRef();
  const dob = useRef();
  const ann = useRef();
  const pnn = useRef();
  const address = useRef();
  const [update, setupdate] = useState({});

  // get data
  const getdata = () => {
    axios.get("http://localhost:3004/posts").then((res) => {
      setdata(res.data);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  // add data
  const adddata = () => {
    const showdata = {
      cardNo: cardno.current.value,
      name: name.current.value,
      fatherName: fathername.current.value,
      sex: sex.current.value,
      dob: dob.current.value,
      AssemblyNoandName: ann.current.value,
      partNoandName: pnn.current.value,
      address: address.current.value
    };
    axios.post("http://localhost:3004/posts", showdata).then((res) => {
      setdata([...data, res.data]);
    });
    cardno.current.value = [];
    name.current.value = [];
    fathername.current.value = [];
    sex.current.value = [];
    dob.current.value = [];
    ann.current.value = [];
    pnn.current.value = [];
    address.current.value = [];
  };

  // delete data
  const deletedata = (id) => {
    console.log(id);
    axios.delete(`http://localhost:3004/posts/${id}`).then((res) => {
      console.log(res);
      setdata(data.filter((val) =>
        val.id !== id));
    });
  };

  // update data
  const updatedata = (val, i) => {
    const result = data[i];
    setupdate(result);
    handleShow();
  };
  const inputchange = (e) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
  };
  const editdata = () => {
    axios
      .put(`http://localhost:3004/posts/${update.id}`, update)
      .then(() => {
        getdata()
      });
    handleClose();
  };

  return (
    <div className="App">
      <br />
      <div className="maindiv">
        <Card style={{ width: '38rem' }} >
          <Card.Body >
            <Card.Title>Card Number :
              <Form.Control type="text" placeholder="Enter Card Number" name="cardno" ref={cardno} />
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <Row>
                <Col xs={6}><b>Name :<Form.Control type="text" placeholder="Enter Your Name" name="name" ref={name} /></b></Col>
                <Col xs={6}><b>Father Name :<Form.Control type="text" placeholder="Enter Your Father Name" name="fathername" ref={fathername} /></b></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={6}><b>Sex :<Form.Control type="text" placeholder="Enter Your Gender" name="sex" ref={sex} /></b></Col>
                <Col xs={6}><b>Date Of Birth :<Form.Control type="text" placeholder="Enter Your Date Of Birth" name="dob" ref={dob} /></b></Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col xs={6}><b>Assembly Noand Name :<Form.Control type="text" placeholder="Enter Assembly Noand" name="ann" ref={ann} /></b></Col>
                <Col xs={6}><b>part Noand Name :<Form.Control type="text" placeholder="Enter part Noand" name="pnn" ref={pnn} /></b></Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Card.Text>
            <b>Address :<Form.Control type="text" placeholder="Enter Your Address" name="address" ref={address} /></b>
          </Card.Text>
          <Button variant="primary" onClick={adddata}>
            Add
          </Button>
        </Card>
      </div>
      <br />
      <h3>
        Your Data
      </h3>
      <br />
      <div>
        {data.map((val, i) => {
          return (
            <div className="maindiv">
              <Card style={{ width: '38rem' }} >
                <Card.Body >
                  <Card.Title>Card No : {val.cardNo}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}><b>Name : </b>{val.name}</Col>
                      <Col xs={6}><b>Father Name : </b>{val.fatherName}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}><b>Sex : </b>{val.sex}</Col>
                      <Col xs={6}><b>Date Of Birth : </b>{val.dob}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6}><b>Assembly Noand Name : </b>{val.AssemblyNoandName}</Col>
                      <Col xs={6}><b>part Noand Name : </b>{val.partNoandName}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
                <Card.Text>
                  <b>Address : </b>{val.address}
                </Card.Text>
                <Row>
                  <Col xs={6}>
                    <Button variant="danger" onClick={() => deletedata(val.id)}>Delete</Button>
                  </Col>
                  <Col xs={6} >
                    <Button variant="success" onClick={() => updatedata(val.id, i)}>
                      Update Your Data
                    </Button>
                  </Col>
                </Row>
              </Card>
              <br />
            </div>
          );
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card style={{ width: '29rem' }} >
            <Card.Body >
              <Card.Title>Card Number :
                <Form.Control type="text" name="cardNo" value={update.cardNo} onChange={inputchange}/>
              </Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>
                <Row>
                  <Col xs={6}><b>Name :<Form.Control type="text" name="name" value={update.name} onChange={inputchange}/></b></Col>
                  <Col xs={6}><b>Father Name :<Form.Control type="text" name="fatherName" value={update.fatherName} onChange={inputchange}/></b></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}><b>Sex :<Form.Control type="text" name="sex" value={update.sex} onChange={inputchange}/></b></Col>
                  <Col xs={6}><b>Date Of Birth :<Form.Control type="text" name="dob" value={update.dob} onChange={inputchange}/></b></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col xs={6}><b>Assembly Noand Name :<Form.Control type="text" name="AssemblyNoandName" value={update.AssemblyNoandName} onChange={inputchange}/></b></Col>
                  <Col xs={6}><b>part Noand Name :<Form.Control type="text" name="partNoandName" value={update.partNoandName} onChange={inputchange}/></b></Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Card.Text>
              <b>Address :<Form.Control type="text" name="address" value={update.address} onChange={inputchange}/></b>
            </Card.Text>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editdata}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
