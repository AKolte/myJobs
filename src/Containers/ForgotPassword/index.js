import styles from './styles.module.css';
import React, { useState, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(false);
    const emailRef = useRef('');
    const history = useHistory();

    const validateEmail = (email) => {
        var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        setEmailValidation(!emailRegex.test(email));
        return emailRegex.test(email)
    }

    const resetPassword = () => {
        if (validateEmail(emailRef.current.value)) history.push(`./resetPassword?email=${emailRef.current.value}&token=sdkfjsdkjfjsdkfjsdfjkri`);
    }

    const renderEmailInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Email address</Form.Label>
            <Form.Control
              isInvalid={emailValidation }
              className="formBg"
              ref={emailRef}
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="email"
              placeholder="Enter your email"
            />
             <Form.Control.Feedback type="invalid">
                {emailValidation ? 'Please enter a valid email.' : null}
            </Form.Control.Feedback>
        </Form.Group>
        );
    }

    return (
        <div class={styles.centerCard}>
            <div className={styles.forgotPassCard}>
                <div className="cardTitle">Forgot Password</div>
                <div style={{ paddingBottom: '20px' }}>
                    Enter the email associated with your account and we’ll send you instructions to reset your password.
                </div>
                {renderEmailInput()}
                <div className={styles.submitButton}>
                    <Button onClick={resetPassword} variant='primary' style={{ padding: '6px 35px' }}>Submit</Button>
                </div>
            </div>
        </div>
    );
}
 
export default ForgotPassword;