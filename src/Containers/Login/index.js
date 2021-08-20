import { useEffect, useRef, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import NavBar from '../../Components/Navbar';
import { Link, useHistory } from 'react-router-dom';
import apis from '../../apis';
import styles from './styles.module.css';

const Login = () => {
    const history = useHistory();
    const [authMessage, setAuthMessage] = useState('');

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);
    const emailRef = useRef('');
    
    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState(true);
    const passRef = useRef('');


    const login = (email, password) => {
        console.log(email, password);

        console.log(apis.login);

        const data = { email, password };

        fetch(apis.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            
            if (data.code >= 200 && data.code <= 299) {
            console.log('Success:', data);
                document.cookie = `email=${data.data.email}`;
                document.cookie = `name=${data.data.name}`;
                document.cookie = `id=${data.data.id}`;
                document.cookie = `token=${data.data.token}`;
                document.cookie = `userRole=${data.data.userRole}`;

            history.push('./dashboard')
        } else {
            console.log('wrongpass');
            setAuthMessage(data.message);
        }
        })
        .catch((error) => {
            setAuthMessage(error.message);
            console.error('Error:', error);
        });

    }

    const validate = () => {
        var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        console.log('validating ', !emailRegex.test(email));
        if (emailRegex.test(email)) {
           login(email, passRef.current.value);
        } else {
            setEmailValidation(false);
        }
    }

    return ( 
        <div fluid className={styles.centerCard}>
            <div  className={styles.loginCard}>
                <div style={{ fontSize: '22px', paddingBottom: '23px' }}>
                    Login
                </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="formBg">Email address</Form.Label>
                        <Form.Control
                          isInvalid={!emailValidation}
                          className="formBg"
                          ref={emailRef}
                          value={email}
                          onChange={e => {
                              setEmailValidation(true);
                              setEmail(e.target.value);
                            }}
                          style={{ maxWidth: '497px', minWidth: '300px' }}
                          type="email"
                          placeholder="Enter email"
                        />
                        <Form.Control.Feedback type="invalid">
                            {!emailValidation ? 'Please enter a valid email.' : null}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <div className={styles.password}>
                            <Form.Label>Password</Form.Label>
                            <Button variant="link" className="formBg">
                                <Link to="/forgotPassword">Forgot your password?</Link>
                            </Button>
                        </div>
                        <Form.Control
                          ref={passRef}
                          value={password}
                          isInvalid={!passwordValidation || authMessage.length}
                          onChange={e => {
                              setPasswordValidation(true);
                              setAuthMessage('')
                              setPassword(e.target.value)
                            }}
                          style={{ maxWidth: '497px', minWidth: '300px' }}
                          type="password"
                          placeholder="Enter your password"
                        />
                        <Form.Control.Feedback type="invalid">
                            {!passwordValidation ? 'Please enter a valid password.' : null}
                            {authMessage}
                            {console.log(authMessage.length, passwordValidation)}
                        </Form.Control.Feedback>
                    </Form.Group>
            
                </Form>
                    <div className={styles.loginAndJoin}>
                        <Button variant='primary' onClick={validate}>Login</Button>
                        <div className={styles.password} style={{ justifyContent: 'center', paddingTop: '20px' }}>
                            New to MyJobs?
                            <Button variant="link">
                                <Link to="/signup">Create an account</Link>
                            </Button>
                        </div>
                    </div>
            </div>
        </div>
    );
}
 
export default Login;