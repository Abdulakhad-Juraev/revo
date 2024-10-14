import React, {Component} from 'react';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import * as authActions from "../../redux/actions/AuthActions";
import {connect} from "react-redux";
import Loading from "../../component/Loading/Loading";
import {EyeButtonSvg, EyeOffButtonSvg} from "../../component/Icons";
import "./Login.scss"
import {Row,Col,Button} from "reactstrap";
import {Link} from "react-router-dom";

class Login extends Component {

    state = {
        variable : false
    }
    handleSignIn = async (e, v) => {
        this.props.dispatch(authActions.login({v, history: this.props.history}))
    };

    render() {
        const {loading} = this.props
        const {variable} = this.state

        const showHide = () => {
            this.setState({variable: !variable})
            let pwd = document.getElementById("pwd")

            variable ? pwd.type = "password" : pwd.type = "text"
        }

        return (
            <>
                <Loading active={loading} />

                <div className={"registration"}>
                    <div className={"w-100 fl-l"}>
                        <Row>
                            <Col md={5} sm={8} xs={10} className={"mx-auto reg-form"}>
                                <AvForm className={"w-100"} onValidSubmit={this.handleSignIn}>
                                    <h1 className={"text-center"}>Kirish</h1>
                                    <AvField name="phone" placeholder="+998 90 1234567" label={"Telefon raqam"} className={"reg-input"}/>
                                    <div className={"reg-pass"}>
                                        <AvField type="password" name="password" id={"pwd"} placeholder="Parol" label={"Parol"} className={"reg-input"}/>

                                        <button type={"button"} className={"btn reg-eye"} onClick={showHide}>
                                            {variable ? <EyeButtonSvg /> : <EyeOffButtonSvg />}
                                        </button>
                                    </div>
                                    <Row className={"reg-input"}>
                                        <Col md={{size: 4, offset : 2}}><Button color={"primary"} className={"w-100"}>Kirish</Button></Col>
                                        <Col md={4}><Link to={"/"} className={"btn btn-outline-primary w-100"}>Bosh sahifa</Link></Col>
                                    </Row>
                                </AvForm>
                            </Col>
                        </Row>
                    </div>
                </div>

            </>
        );
    }
}

Login.propTypes = {};


export default connect(
    ({
         app: {},
         auth: {isAdmin, isSuperAdmin, currentUser,loading}
     }) => ({
        loading,
        isAdmin,
        isSuperAdmin,
        currentUser
    })
)(Login);
