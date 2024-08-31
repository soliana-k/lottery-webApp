import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Footer = () => {
    return (
        <footer className="main-footer bg-dark text-white py-4">
            <div className="container">
                <div className="row">
                    {/* Content for larger screens */}
                    <div className="d-none d-md-block col-lg-4 col-md-6 mb-4">
                        <h5 className="mb-3">Privacy Policy</h5>
                        <p className="text">
                            Our privacy policy outlines how we collect, use, and protect your personal information. We are committed to safeguarding your privacy and ensuring the security of your data. For more details, please read our full <a href="/privacy-policy" className="text-decoration-none">Privacy Policy</a>.
                        </p>
                    </div>
                    
                    <div className="d-none d-md-block col-lg-4 col-md-6 mb-4">
                        <h5 className="mb-3">Terms of Service</h5>
                        <p className="text">
                            By accessing and using this website, you agree to abide by our terms of service. These terms govern your use of our site and services, and outline our responsibilities and limitations. Read our <a href="/terms-of-service" className="text-decoration-none">Terms of Service</a> for more information.
                        </p>
                    </div>

                    <div className="d-none d-md-block col-lg-4 col-md-12 mb-4">
                        <h5 className="mb-3">Follow Us</h5>
                        <div className="social-links row">
                            <div className="col-auto mb-2">
                                <a href="#twitter" className="text-white text-decoration-none"><i className="bi bi-twitter me-2"></i></a>
                            </div>
                            <div className="col-auto mb-2">
                                <a href="#facebook" className="text-white text-decoration-none"><i className="bi bi-facebook me-2"></i></a>
                            </div>
                            <div className="col-auto mb-2">
                                <a href="#linkedin" className="text-white text-decoration-none"><i className="bi bi-linkedin me-2"></i></a>
                            </div>
                            <div className="col-auto mb-2">
                                <a href="#instagram" className="text-white text-decoration-none"><i className="bi bi-instagram me-2"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Content for small screens */}
                    <div className="d-block d-md-none text-center">
                        <a href="/privacy-policy" className="d-block mb-2 text-white text-decoration-none">Privacy Policy</a>
                        <a href="/terms-of-service" className="d-block mb-2 text-white text-decoration-none">Terms of Service</a>
                        <h5 className="mb-3">Follow Us</h5>
                        <div className="social-links d-flex flex-column align-items-center">
                            <a href="#twitter" className="d-block mb-2 text-white text-decoration-none"><i className="bi bi-twitter me-2"></i></a>
                            <a href="#facebook" className="d-block mb-2 text-white text-decoration-none"><i className="bi bi-facebook me-2"></i></a>
                            <a href="#linkedin" className="d-block mb-2 text-white text-decoration-none"><i className="bi bi-linkedin me-2"></i></a>
                            <a href="#instagram" className="d-block mb-2 text-white text-decoration-none"><i className="bi bi-instagram me-2"></i></a>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="mb-0">&copy; {new Date().getFullYear()} Everlink. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;