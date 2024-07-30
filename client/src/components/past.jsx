import React from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PastPrizes from './pastprizes';
import './past.css';
const Past = () =>{
    return(
        <div className="past-text text-center">
            <Accordion >
                <Accordion.Item eventKey='0' >
                <Accordion.Header className="custom-accordion-header">
                <center><h3 className="mt-3 pt-2 mb-4 fw-bold h-font">Past Prizes</h3></center>
                </Accordion.Header>
                    <Accordion.Body>
                      <PastPrizes/> 
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>        
    );
}
export default Past;