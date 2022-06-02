import React, {Component} from "react";
import {connect} from "react-redux";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import * as CommentManagementActions from "../actions/CommentManagementActions.js";
import {bindActionCreators} from "redux";

const mapStateToProps = (state) => {
    return {
        specificcomments: state.comment.specificcomments,
        accessToken: state.authentication.accessToken,
        comments: state.comment.comments
    }
}

class EditCommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({show : true})
    }

    handleClose(e) {
        this.setState({show : false})
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();
        const {messageTitle, messageText} = this.state;
        const {editComment} = this.props;
        console.log(this.props)
        console.log(this.state);
        editComment(this.props.accessToken, this.props.givenComment._id, messageTitle, messageText);
        this.setState({show : false})
    }

    render() {
        var showDialog = this.state.show;
        if (showDialog === undefined) 
            showDialog = false;

        return (
            <>
                <Button id={"EditButton" + this.props.givenComment._id} variant="primary" onClick={this.handleShow}>
                    Edit
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                {/* <AlertWrongCredentials/> */}
                                <Form.Label>title</Form.Label>
                                <Form.Control
                                    id="messageTitle"
                                    type="text"
                                    name="messageTitle"
                                    defaultValue= { this.props.givenComment.messageTitle }
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>messageText</Form.Label>
                                <Form.Control
                                    id="messageText"
                                    type="text"
                                    defaultValue= { this.props.givenComment.messageText }
                                    name="messageText"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Button
                                id="SaveCommentButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Edit Comment
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    showEditCommentDialogAction: CommentManagementActions.getShowEditCommentDialogAction,
    hideEditCommentDialogAction: CommentManagementActions.getHideEditCommentDialogAction,
    editComment: CommentManagementActions.editComment,

}, dispatch);

const ConnectedEditCommentModal = connect(mapStateToProps, mapDispatchToProps)(EditCommentModal);

export default ConnectedEditCommentModal;
