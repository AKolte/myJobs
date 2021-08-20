import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import { Button, Image } from 'react-bootstrap';
import interview from './assets/interview.png';

const myJobs = () => {
    return (
        <div>
            <span className={styles.whiteText}>My</span>
            <span className={styles.primaryColor}>Jobs</span>
        </div>
    );
}

const headerContent = () => {
    return (
        <div className={styles.headerContent} >
            <div style={{ fontSize: '60px' }} className={`${styles.whiteText}`}>
                Welcome to {myJobs()}
                <Link to='/signup'><Button>Get Started</Button></Link>
            </div>
            <div>
                <Image src={interview} className={styles.interviewImage} fluid />
            </div>
        </div>
    );
}

const Home = () => {
    return ( 
        <header>
            <div>
                {headerContent()}
            </div>
        </header>
     );
}
 
export default Home;