import React, { useState } from 'react';
import { Container, Row, Col, Table, Tab, Nav } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';

const History = () => {
  const [key, setKey] = useState('draws');

  const pastDraws = [
    { id: 1, date: '2024-08-01', time: '15:00', winner: 'Alice Smith' },
    { id: 2, date: '2024-08-02', time: '16:00', winner: 'Bob Johnson' },
  ];

  const logs = [
    { id: 1, action: 'Draw Created', timestamp: '2024-08-01 14:00', details: 'Draw ID: 1 created by Admin' },
    { id: 2, action: 'Draw Updated', timestamp: '2024-08-02 15:00', details: 'Draw ID: 1 updated by Admin' },
  ];

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/numbermgmt' },
          { label: 'Draw Management', href: '/draw' },
          { label: 'History', href: '/history' }
        ]}
      />
      <Row className="my-4">
        <Col md={12}>
          <h2 className="mb-4">Draw History</h2>
          <Tab.Container id="left-tabs-example" activeKey={key} onSelect={(k) => setKey(k)}>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="draws">Past Draws</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="logs">Logs</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="draws">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastDraws.map((draw) => (
                      <tr key={draw.id}>
                        <td>{draw.id}</td>
                        <td>{draw.date}</td>
                        <td>{draw.time}</td>
                        <td>{draw.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane eventKey="logs">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Action</th>
                      <th>Timestamp</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td>{log.id}</td>
                        <td>{log.action}</td>
                        <td>{log.timestamp}</td>
                        <td>{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default History;
