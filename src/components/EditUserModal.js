import {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as userManagementActions from "../actions/UserManagementActions.js";
import {bindActionCreators} from "redux";
import { ModalFooter } from "react-bootstrap";

const mapStateToProps = (state) => {
    return state;
};

class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken : props.authentication.accessToken,
            show : false
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
        this.setState({show: true})
    }

    handleClose(e) {
        this.setState({show: false})
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {editUser} = this.props;
        editUser(this.props.authentication.accessToken, this.props.specificUser.userID, this.state.userName, this.state.password);
        this.setState({show : false})
    }

    render() {
        var showDialog = this.state.show;
        if (showDialog === undefined) showDialog = false;
        return (
            <>
                <Button id={"EditButton" + this.props.specificUser.userID} variant="primary" onClick={this.handleShow}>
                    Edit User
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>UserID</Form.Label>
                                <Form.Control
                                    disabled
                                    id="UserIDInput"
                                    type="text"
                                    placeholder= {this.props.specificUser.userID}
                                    defaultValue= {this.props.specificUser.userID}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>UserName</Form.Label>
                                <Form.Control
                                    id="UserNameInput"
                                    type="text"
                                    placeholder="Username"
                                    name="userName"
                                    defaultValue={this.props.specificUser.userName}
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
                                id="SaveUserButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Edit User
                            </Button>
                        </Form>
                    </Modal.Body>
                    <ModalFooter>{this.props.specificUser.userID}</ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showEditUserDialogAction: userManagementActions.getShowEditUserDialogAction,
    hideEditUserDialogAction: userManagementActions.getHideEditUserDialogAction,
    editUser: userManagementActions.editUser,

}, dispatch);

const ConnectedEditUserModal = connect(mapStateToProps, mapDispatchToProps)(EditUserModal);

export default ConnectedEditUserModal;
