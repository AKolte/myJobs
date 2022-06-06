import { useState, useRef } from 'react';
import { Form, Button  } from 'react-bootstrap';
import apis from '../../../apis';
import { cookieObject } from '../../../App';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';


const CreateJobpost = () => {

    const [title, setTitle] = useState('');
    const [isValidTitle, setValidTitle] = useState(true);
    const titleRef = useRef('');
    
    const [description, setDescription] = useState('');
    const [isValidDescription, setValidDescription] = useState(true);
    const descriptionRef = useRef('');
    
    const [location, setLocation] = useState('');
    const [isValidLocation, setValidLocation] = useState(true);
    const locationRef = useRef('');

    const history = useHistory();

    const rendeTitleInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Job Title</Form.Label>
            <Form.Control
              isInvalid={!isValidTitle}
              className="formBg"
              ref={titleRef}
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="text"
              placeholder="Enter job title"
            />
        </Form.Group>
        );
    }

    const renderDescriptionInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Description</Form.Label>
            <Form.Control
              as="textarea"
              isInvalid={!isValidDescription}
              className="formBg"
              ref={descriptionRef}
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ maxWidth: '497px', minWidth: '300px', minHeight: '100px' }}
              type="text"
              placeholder="Enter job description"
            />
        </Form.Group>
        );
    }

    const rendeLocationInput = () => {
        return (
            <Form.Group className="mb-3">
            <Form.Label className="formBg">Enter Location</Form.Label>
            <Form.Control
              isInvalid={!isValidLocation}
              className="formBg"
              ref={locationRef}
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ maxWidth: '497px', minWidth: '300px' }}
              type="text"
              placeholder="Enter location"
            />
        </Form.Group>
        );
    }

    const validateFields = () => {
        return (titleRef.current.value.length && descriptionRef.current.value.length && locationRef.current.value.length);
    }

    const postJob = () => {
        if (validateFields) {
            console.log(cookieObject)
            const data = {title, description, location };
            fetch(apis.createJobpost, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': cookieObject.token,
                },
                body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    if (data.code >= 200 && data.code <= 299) {
                    history.push('./dashboard')
                } else {
                }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        
        }
    }

    return ( 
        <div className={styles.jobpostCard}>
            <div className="cardTitle">
                Post a Job
            </div>

            {rendeTitleInput()}
            {renderDescriptionInput()}
            {rendeLocationInput()}

                <Button onClick={() => {postJob()}}>
                    Post
                </Button>
        </div>
     );
}
 
export default CreateJobpost;