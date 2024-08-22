import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Tab, Nav } from 'react-bootstrap';
import Breadcrumbs from '../../breadcrumb';
import axios from 'axios'; 

const History = () => {
  const [key, setKey] = useState('draws');
  const [pastDraws, setPastDraws] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const drawsResponse = await axios.get('http://localhost:8000/api/v1/admin/draws');
        setPastDraws(drawsResponse.data);

        
        const logsResponse = await axios.get('http://localhost:8000/api/v1/admin/draws');
        setLogs(logsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Number Management', href: '/number' },
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
                      <tr key={draw._id}>
                        <td>{draw._id}</td>
                        <td>{new Date(draw.date).toLocaleDateString()}</td>
                        <td>{draw.time}</td>
                        <td>{draw.winner ? draw.winner.name : 'N/A'}</td> {/* Adjust according to your schema */}
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
                      <tr key={log._id}>
                        <td>{log._id}</td>
                        <td>{log.action}</td>
                        <td>{new Date(log.timestamp).toLocaleString()}</td>
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
