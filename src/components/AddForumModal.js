import React, {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as forumManagementActions from "../actions/ForumManagementActions.js";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return state;
};

class AddForumModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken : props.authentication.accessToken,
            forums : props.forum.forums
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
        const {showAddForumDialogAction} = this.props;
        showAddForumDialogAction();
    }

    handleClose(e) {
        const {hideAddForumDialogAction} = this.props;
        hideAddForumDialogAction();
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {forumID, forumName, ownerID, forumDescription} = this.state;
        const {addForum} = this.props;
        addForum(this.state.accessToken, forumID, forumName, forumDescription, ownerID);
        console.log("Pushed submit");
    }

    render() {
        var showDialog = this.props.forum.showAddForumDialog;
        if (showDialog === undefined) showDialog = false;
        return (
            <div>
                <Button id="OpenCreateForumDialogButton" variant="primary" onClick={this.handleShow}>
                    Add Forum
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Forum</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>OwnerID</Form.Label>
                                <Form.Control
                                    readOnly
                                    id="OwnerIDInput"
                                    type="text"
                                    placeholder={this.props.authentication.userID}
                                    value={this.props.authentication.userID}
                                    name="ownerID"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>Forumname</Form.Label>
                                <Form.Control
                                    id="ForumNameInput"
                                    type="text"
                                    placeholder="Forumname"
                                    name="forumName"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>forumDescription</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    id="ForumDescriptionInput"
                                    type="text"
                                    placeholder="Forumdescription"
                                    name="forumDescription"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Button
                                id="CreateForumButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Create Forum
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showAddForumDialogAction: forumManagementActions.getShowAddForumDialogAction,
    hideAddForumDialogAction: forumManagementActions.getHideAddForumDialogAction,
    addForum: forumManagementActions.addForum,
}, dispatch);

const ConnectedAddForumModal = connect(mapStateToProps, mapDispatchToProps)(AddForumModal);

export default ConnectedAddForumModal;
