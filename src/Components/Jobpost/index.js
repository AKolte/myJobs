import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ViewApplicants from '../../Containers/RecruiterFlow/ViewApplicants'
import styles from './styles.module.css';

// const LocationAndApplicants = (description) => {
//     // const [showApplications, setShowApplications] = useState(false); 
//     return(
       
//     );
// }

const Jobpost = (jobDescription, setViewApplications) => {
    // const [showApplications, setShowApplications] = useState(false); 
    return ( 
        <div key={`job${jobDescription.id}`} className={styles['jobpost']}>
            <div style={{ fontSize: '17px' }}>{jobDescription.title}</div>
            <div style={{ fontSize: '14px' }}>{jobDescription.description}</div>


            <div key={jobDescription.id} className={styles.locationAndApplicants}>
            <div>
                <i className="fa fa-map-marker" />
                {jobDescription.location}
            </div>
            <Button onClick={() => setViewApplications(jobDescription.id)} className={styles.blueBg}>
                View Applications
            </Button>
            
        </div>
           
        </div>
     );
}
 
export default Jobpost;