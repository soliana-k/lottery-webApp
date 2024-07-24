import React from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './faq.css';

const FAQAccordion = () => {
    return (
        <div className="faq-accordion">
            <h2>FAQ</h2>
            <Accordion >
                <Accordion.Item eventKey='0' >
                    <Accordion.Header>What is the purpose of this platform?</Accordion.Header>
                    <Accordion.Body>
                        Our platform aims to simplify and streamline the process of participating in various activities, making it accessible and easy for everyone.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>How can I contact support?</Accordion.Header>
                    <Accordion.Body>
                        You can contact our support team through the contact form on our website or by sending an email to support@example.com.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>What are the payment options available?</Accordion.Header>
                    <Accordion.Body>
                        We accept various payment methods including credit/debit cards, PayPal, and bank transfers.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default FAQAccordion;
