import { useEffect, useState } from "react";
import apis from '../../../apis';
import { cookieObject } from "../../../App";
import { Modal } from "react-bootstrap"

const ViewApplicants = (props) => {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch(`${apis.getSingleJobDetails}/${props.jobId}`, {
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
            // todo 
            }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, [props.jobId]);

    return ( 
        <div>
            <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
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
 
export default ViewApplicants;