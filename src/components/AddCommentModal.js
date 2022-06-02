import React, {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as commentManagementActions from "../actions/CommentManagementActions.js";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return state;
};

class AddCommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specificcomments: props.specificcomments
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleShow(e) {
        e.preventDefault();
        const {showAddCommentDialogAction} = this.props;
        showAddCommentDialogAction();
    }

    handleClose(e) {
        const {hideAddCommentDialogAction} = this.props;
        hideAddCommentDialogAction();
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {messageTitle, messageText} = this.state;
        const {addComment} = this.props;
        console.log(this.props.authentication.userID +" Pushed submit");
        addComment(this.props.authentication.accessToken, this.props.forumID,
            messageTitle, messageText, this.props.authentication.userID);
    }

    render() {
        var showDialog = this.props.comment.showAddCommentDialog;
        if (showDialog === undefined) showDialog = false;
            
        return (
            <div>
                <Button id="OpenCreateCommentDialogButton"
                variant="primary" onClick={this.handleShow}>
                    Add Comment
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>Messagetitle</Form.Label>
                                <Form.Control
                                    id="MessageTitle"
                                    type="text"
                                    placeholder="Messagetitle"
                                    name="messageTitle"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>messageText</Form.Label>
                                <Form.Control
                                    id="MessageTextInput"
                                    type="text"
                                    placeholder="MessageText"
                                    name="messageText"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Button
                                id="CreateMessageButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Create Message
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showAddCommentDialogAction: commentManagementActions.getShowAddCommentDialogAction,
    hideAddCommentDialogAction: commentManagementActions.getHideAddCommentDialogAction,
    addComment: commentManagementActions.addComment,
}, dispatch);

const ConnectedAddCommentModal = connect(mapStateToProps, mapDispatchToProps)(AddCommentModal);

export default ConnectedAddCommentModal;
