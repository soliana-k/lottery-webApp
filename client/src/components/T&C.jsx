import React from 'react';

const Terms = ({ showModal, handleClose }) => {
    return (
        <>
            {showModal && (
                <div className='modal show d-block' tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className='modal-dialog modal-sm' role="document">
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Terms and Conditions</h5>
                                <button type="button" className='close' onClick={handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                This is body
                            </div>
                            <div className='modal-footer'>
                                <button type="button" className='btn btn-default' onClick={handleClose}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Terms;
