import React from 'react';
import {useState, useRef } from 'react';
import styles from './styles.module.css';
import { useLocation  } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


const ResetPassword = () => {    

    const { search } = useLocation();

    const [password, setPassword] = useState('');
    const [isValidPassword, setValidPassword] = useState(true);
    const passRef = useRef('');
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidConfirmPassword, setValidConfirmPassword] = useState(true);
    const confirmPassRef = useRef('');

    console.log(search);
    const query = new URLSearchParams(search);
    const email = query.get('email');
    const resetToken = query.get('token');
    console.log('email ', email, 'token ', resetToken);



    const renderPasswordInput = (passRef, password, isValidPassword, setPassword) => {
        return(
            <Form.Group className="mb-3" >
                <div className={styles.password}>
                    <Form.Label>Password</Form.Label>
                </div>
                <Form.Control
                    ref={passRef}
                    value={password}
                    isInvalid={!isValidPassword}
                    onChange={e => setPassword(e.target.value)}
                    style={{ maxWidth: '238px' }}
                    type="password"
                    placeholder="Enter your password"
                />
            </Form.Group>
        );
    }

    console.log("restpasss");
    return (
        <div class={styles.centerCard}>
            <div className={styles.resetCard}>
                <div className="cardTitle">Reset Your Password</div>
                <div style={{ paddingBottom: '20px' }}>Enter your new password below.</div>
                {renderPasswordInput(passRef, password, isValidPassword, setPassword)}
                {renderPasswordInput(confirmPassRef, confirmPassword, isValidConfirmPassword, setConfirmPassword)}
                <Button variant='primary'>Reset</Button>
            </div>
        </div>
    );
}
 
export default ResetPassword;