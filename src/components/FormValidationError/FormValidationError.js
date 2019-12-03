import React from 'react';
import PropTypes from 'prop-types';
import './FormValidationError.css';

function FormError (props) {
    if (props.message) {
        return (
            <div className="error-message" aria-live="polite">
                {props.message}
            </div>
        );
    }
    return <></>
}

export default FormError;

FormError.propTypes = {
    message: PropTypes.string
}