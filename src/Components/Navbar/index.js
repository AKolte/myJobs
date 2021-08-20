import { Navbar, Container, Button } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom';
import styles from './styles.module.css';

const myJobs = () => {
    return (
        <div>
            <span className="whiteText">My</span>
            <span className="primaryColor">Jobs</span>
        </div>
    );
}

const NavBar = (props = {showLogin: true}) => {
    
    return ( 
        <Navbar>
            <Container>
                <Navbar.Brand><Link to='/'>{myJobs()}</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                   {props.showLogin ? <Link to='/login'><Button>Login/Signup</Button></Link> : null}
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default NavBar;