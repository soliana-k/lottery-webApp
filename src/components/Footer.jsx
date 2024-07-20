import React from 'react';

const Footer = () => {
    return (
        <footer className="main-banner">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 p-4">
                        <h5 className="mb-3">Privacy Policy</h5>
                        <p className="text">
                            Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to safeguarding your privacy and ensuring the security of your data. For more details, please read our full <a href="/privacy-policy" className="text-decoration-none">Privacy Policy</a>.
                        </p>
                    </div>
                    <div className="col-lg-4 p-2">
                        <h5 className="mb-3 mt-4">Terms of Service</h5>
                        <p className="text">
                            By accessing and using this website, you agree to abide by our terms of service. These terms govern your use of our site and services, and outline our responsibilities and limitations. Read our <a href="/terms-of-service" className="text-decoration-none">Terms of Service</a> for more information.
                        </p>
                    </div>
                    <div className="col-lg-4 p-4">
                        <div className="d-flex flex-column h-100 justify-content-between">
                            <h5 className="mb-3">Links</h5>
                            <a href="/" className="d-inline-block mb-2 text-light text-decoration-none">Home</a><br />
                            <a href="/rooms" className="d-inline-block mb-2 text-light text-decoration-none">How It works</a><br />
                            <a href="/facilities" className="d-inline-block mb-2 text-light text-decoration-none">Prizes</a><br />
                            <a href="/contact" className="d-inline-block mb-2 text-light text-decoration-none">Contact us</a><br />
                            <a href="/about" className="d-inline-block mb-2 text-light text-decoration-none">FAQ</a>
                        </div>
                    </div>
                    <div className="col-lg-4 p-4">
                        <h5 className="mb-3">Follow Us</h5>
                        <a href="#" className="d-inline-block mb-2 text-dark text-decoration-none"><i className="bi bi-twitter me-1"></i>Twitter</a><br />
                        <a href="#" className="d-inline-block mb-2 text-dark text-decoration-none"><i className="bi bi-facebook me-1"></i>Facebook</a><br />
                        <a href="#" className="d-inline-block mb-2 text-dark text-decoration-none"><i className="bi bi-instagram me-1"></i>Instagram</a><br />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
