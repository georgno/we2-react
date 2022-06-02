import {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'

import * as authenticationActions from "../actions/AuthenticationActions";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return state;
};

class UserSessionWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleShow = this
            .handleShow
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSubmit = this
            .handleSubmit
            .bind(this);
    }

    handleShow(e) {
        e.preventDefault();
        const {showLoginDialogAction} = this.props;
        showLoginDialogAction();
    }

    handleClose(e) {
        const {hideLoginDialogAction} = this.props;
        hideLoginDialogAction();
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {userID, password} = this.state;
        const {authenticateUserAction} = this.props;
        authenticateUserAction(userID, password);
    }

    render() {
        var showDialog = this.props.authentication.showLoginDialog;
        var error = this.props.authentication.error;
        if (showDialog === undefined) 
            showDialog = false;
        
        function AlertWrongCredentials() {
            if (error != null) {
                return (
                    <Alert variant="danger">
                        <Alert.Heading>{ error }</Alert.Heading>
                        <p>
                            Oh no! Wrong credentials :(
                        </p>
                    </Alert>
                );
            }
            return(null);
        }


        return (
            <div>
                <Button id="LoginOpenDialogButton" variant="primary" onClick={this.handleShow}>
                    Login
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <AlertWrongCredentials/>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    id="LoginUserIDInput"
                                    type="text"
                                    placeholder="Enter username"
                                    name="userID"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="LoginPasswordInput"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Button
                                id="LoginButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Login
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>Passwort vergessen?</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch);

const ConnectedUserSessionWidget = connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget);

export default ConnectedUserSessionWidget;
