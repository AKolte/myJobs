import {useState, useRef } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import apis from '../../apis';
import recruiter from './assets/recruiter.svg';
import styles from './styles.module.css';

const Signup = () => {

    const [name, setName] = useState('');
    const [isValidName, setValidName] = useState(true);
    const nameRef = useRef('');

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState(true);
    const emailRef = useRef('');
    
    const [password, setPassword] = useState('');
    const [isValidPassword, setValidPassword] = useState(true);
    const passRef = useRef('');
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const confirmPassRef = useRef('');

    const [skills, setSkills] = useState('');
    const skillsRef = useRef('');

    const [errorResponse, setErrorResponse] = useState('');
    const history = useHistory();
    const renderRole = () => {
        return (
            <div>
                I'm a*
                <div >
                    <Button variant="primary">
                        <Image src={recruiter} style={{ height: '22px' }} />
                        &nbsp;
                        <span style={{ color: '#fff' }}>Recruiter</span>
                    </Button>
                    <Button disabled variant="outline-light" className={styles.candidateSignup}>
                    <i className="fa fa-users" aria-hidden="true" />
                    &nbsp;
                    <span style={{ color: '#000 !important' }}>Candidate</span>
                    </Button>
                </div>
            </div>
        );
    }

    const renderNameInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Full Name*</Form.Label>
            <Form.Control
              isInvalid={!isValidName}
              className="formBg"
              ref={nameRef}
              value={name}
              onChange={e => {
                  setErrorResponse('');
                  setValidName(true);
                  setName(e.target.value);
                }}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="text"
              placeholder="Enter your full name"
            />
            <Form.Control.Feedback type="invalid">
                {!isValidName ? 'This field is mandatory.' : null}
            </Form.Control.Feedback>
        </Form.Group>
        );
    }

    const renderEmailInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Email address*</Form.Label>
            <Form.Control
              isInvalid={!emailValidation}
              className="formBg"
              ref={emailRef}
              value={email}
              onChange={e => {
                  setErrorResponse('');
                  setEmailValidation(true);
                  setEmail(e.target.value);
                }}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="email"
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
                {!emailValidation ? 'Invalid email address.' : null}
            </Form.Control.Feedback>
        </Form.Group>
        );
    }

    const renderPasswordInput = (passRef, password, isValidPassword, setPassword) => {
        return(
            <Form.Group className="mb-3" >
                <div className={styles.password}>
                    <Form.Label>Password*</Form.Label>
                </div>
                <Form.Control
                    ref={passRef}
                    value={password}
                    isInvalid={!isValidPassword}
                    onChange={e => {
                        setErrorResponse('');
                        setValidPassword(true);
                        setPassword(e.target.value)}
                    }
                    style={{ maxWidth: '238px' }}
                    type="password"
                    placeholder="Enter your password"
                />
                <Form.Control.Feedback type="invalid">
                    {!isValidPassword ? 'Passwords don\'t match' : null}
                </Form.Control.Feedback>
            </Form.Group>
        );
    }

    const renderSkillsInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Skills</Form.Label>
            <Form.Control
              className="formBg"
              ref={skillsRef}
              value={skills}
              onChange={e => setSkills(e.target.value)}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="text"
              placeholder="Enter comma separated skills"
            />
        </Form.Group>
        );
    }

    const isValidForm = () => {
        var emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (emailRegex.test(email)) {
           setEmailValidation(true);
        } else {
            setEmailValidation(false);
        }
        setValidName(nameRef.current.value.length ? true : false)
        setValidPassword(passRef.current.value === confirmPassRef.current.value)
        return (emailValidation && isValidName && isValidPassword);
    }

    const signUp = () => {

        if (isValidForm()) {
            const data={name, email, userRole: 0, password, confirmPassword, skills};
            fetch(apis.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code >= 200 && data.code <= 299) {
                    history.push('./login');
                } else {

                    let errorMessage = ' ';
                    data.errors?.forEach((eachError) => {
                        return(errorMessage += '\n' + eachError.name);
                    });
                    if (data.message) errorMessage+=data.message;
                    setErrorResponse(errorMessage);
                }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }
    return ( 
        <div className={styles.centerCard}>
            <div className={styles.signupCard}>
                <div style={{ fontSize: '22px', paddingBottom: '23px' }}>
                    Signup
                </div>
                <Form>
                    {renderRole()}
                    {renderNameInput()}
                    {renderEmailInput()}
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        {renderPasswordInput(passRef, password, isValidPassword, setPassword)}
                        <div style={{ marginLeft: '21px' }}>
                            {renderPasswordInput(confirmPassRef, confirmPassword, isValidPassword, setConfirmPassword)}
                        </div>
                    </div>
                    {renderSkillsInput()}

                    
                    <div className={styles.signupAndLogin}>
                        <div style={{ color: 'red'}}>{errorResponse}</div>
                        <Button onClick={signUp} variant='primary'>Signup</Button>
                        <div style={{ paddingTop: '40px'}}>
                            Have an account?
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </Form>
            </div>
        </div> 
    );
}
 
export default Signup;