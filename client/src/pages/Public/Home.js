import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import axios from "axios";

class Home extends Component {
    render() {

        const sendSms = () => {
            console.clear()
            // axios.post('http://localhost:8080/test').then(response => console.log(response));
        }

        return (
            <div>
                <h2>Main Page</h2>

                <Button onClick={sendSms}>
                    Send SMS
                </Button>

                <hr />
                <Link to={"/login"}>
                    Login
                </Link>
            </div>
        );
    }
}

Home.propTypes = {};

export default Home;