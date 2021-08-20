import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apis from '../../../apis';
import { cookieObject } from './../../../App';
import { Button, Image, Modal, Breadcrumb } from 'react-bootstrap';
import Jobpost from '../../../Components/Jobpost';
import blank from './assets/blank.svg';
import styles from './styles.module.css';


const Dashboard = () => {

    const [applications, setApplications] = useState([]);
    const [jobModalId, setJobModalId] = useState([]);
    const [viewApplcations, setViewApplcations] = useState(false);

    const [postedJobs, setPostedJobs] = useState([]);
    

    useEffect(() => {
        fetch(`${apis.getSingleJobDetails}/${jobModalId}/candidates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookieObject.token,
            },
            })
            .then(response => response.json())
            .then(data => {
                if (data.code >= 200 && data.code <= 299) {

                return data;
            } else {
                //todo
            }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [jobModalId]);

    useEffect(() => {
        fetchJobsFromRecruiter(cookieObject.token)
    }, []);

    const fetchJobsFromRecruiter = (token) => {
        fetch(apis.fetchAllPostedJobs, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookieObject.token,
            },
            })
            .then(response => response.json())
            .then(data => {
                if (data.code >= 200 && data.code <= 299) {
                setPostedJobs(data.data.data);
                return data;
                // history.push('./dashboard')
            } else {
                //todo
            }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const showApplicants = () => {

        return (
            <div>
            <Modal show={viewApplcations} onHide={() => setViewApplcations(false)} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Using Grid in Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <div>
                        content
                    </div>
                </Modal.Body>
            </Modal>
        </div>
        );
    }

    function openModal (jobId) {
        setJobModalId(jobId);
        setViewApplcations(true);
    }

    const renderBreadcrumb = () => {
        return (
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/dashboard'><i className="fa fa-home" aria-hidden="true" />&nbsp;Home</Link>
                </Breadcrumb.Item>
                
            </Breadcrumb>
        );       
    }
    if (postedJobs.length) {
        
        return (
            <div>
                <div className={styles.recruiterDashboard}>
                {renderBreadcrumb()}
                    <div style={{ fontSize: '22px', paddingBottom:'20px' }} className="whiteText">
                        Jobs posted by you
                    </div>
                </div>
                <div className={styles.jobCards}>
                    {postedJobs.map((jobpost) => {
                        return Jobpost(jobpost, (id) => openModal(id))
                    })}
                </div>

                
            </div>
        );
    } else {
        return ( 
            <div>
                {renderBreadcrumb()}
                <div className={styles.recruiterDashboard}>
                    <div style={{ fontSize: '22px' }} className="whiteText">
                        Jobs posted by you
                    </div>
                </div>
                <div className={styles.noJobsPosted}>
                    <Image style={{ maxHeight: '106px' }} src={blank}></Image>
                        <div style={{ paddingBottom: '20px' }}>
                        Your posted jobs will show here!
                        </div>
                        <Link to='/createJobpost'>
                            <Button>Post a Job</Button>
                        </Link>
                </div>
            </div>
        );
    }
}
 
export default Dashboard;