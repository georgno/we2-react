import React, {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as userManagementActions from "../actions/UserManagementActions.js";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return state;
};

class AddUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : props.user.users,
            accessToken : props.authentication.accessToken
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleShow(e) {
        e.preventDefault();
        const {showAddUserDialogAction} = this.props;
        showAddUserDialogAction();
    }

    handleClose(e) {
        const {hideAddUserDialogAction} = this.props;
        hideAddUserDialogAction();
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {userID, userName, password} = this.state;
        const {addUser} = this.props;
        addUser(this.state.accessToken, userID, userName, password);
    }

    render() {
        var showDialog = this.props.user.showAddUserDialog;
        if (showDialog === undefined) showDialog = false;
            
        return (
            <div>
                <Button id="OpenCreateUserDialogButton" variant="primary" onClick={this.handleShow}>
                    Add User
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>UserID</Form.Label>
                                <Form.Control
                                    id="UserIDInput"
                                    type="text"
                                    placeholder="UserID"
                                    name="userID"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    id="UserNameInput"
                                    type="text"
                                    placeholder="Username"
                                    name="userName"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    id="PasswordInput"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Button
                                id="CreateUserButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Create User
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showAddUserDialogAction: userManagementActions.getShowAddUserDialogAction,
    hideAddUserDialogAction: userManagementActions.getHideAddUserDialogAction,
    addUser: userManagementActions.addUser,
}, dispatch);

const ConnectedAddUserModal = connect(mapStateToProps, mapDispatchToProps)(AddUserModal);

export default ConnectedAddUserModal;
