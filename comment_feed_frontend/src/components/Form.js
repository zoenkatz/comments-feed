import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Form extends Component {


    render() {
        const {addCommentForm, handleInputChange, handleFormSubmit} = this.props;

        return (
            <div className="form-section">
                <form className='main-form' onSubmit={(e) => handleFormSubmit(e)}>
                    <div className='field'>
                        <input type="text" placeholder='Email' onChange={(e) => handleInputChange(e, "email")}/>
                    </div>
                    <div className='field field-message'>
                        <input type="text" placeholder='Message' onChange={(e) => handleInputChange(e, "message")}/>
                    </div>
                    <div className='form-submit'>
                        <button type='submit' className='submit-button' role='button'>
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

Form.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleFormSubmit: PropTypes.func.isRequired
};

export default Form;
