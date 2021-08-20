import LandingPage from './../LandingPage';
import Login from './../Login';
import Signup from '../Signup';
import ForgotPassword from '../ForgotPassword'
import ResetPassword from '../ResetPassword';
import RecruiterDashboard from '../RecruiterFlow/Dashboard';
import CreateJobpost from '../RecruiterFlow/CreateJobpost';
import NavBar from '../../Components/Navbar';
import styles from './styles.module.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = () => {
    return ( 
        <div className={`${styles.splitBg}`}>
        <Router>
        {NavBar()}
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/forgotpassword" component={ForgotPassword} />
                <Route path="/resetPassword" component={ResetPassword} />

                <Route path="/dashboard" component={RecruiterDashboard} />
                <Route path="/createJobpost" component={CreateJobpost} />
            </Switch>
        </Router>
        </div>
     );
}
 
export default Home;