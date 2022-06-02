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

class EditForumModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const {editForum} = this.props;
        console.log(this.props)
        console.log(this.state)
        console.log(this.props.specificforum._id)
        editForum(this.props.authentication.accessToken, this.props.specificforum._id, this.state.forumName, this.state.forumDescription);
        this.setState({show : false})
    }

    render() {
        var showDialog = this.state.show;
        if (showDialog === undefined) showDialog = false;
        return (
            <div>
                <Button id={"EditButton" + this.props.specificforum._id} variant="primary" onClick={this.handleShow}>
                    Edit Forum
                </Button>

                <Modal
                    show={showDialog}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Forum</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>OwnerID</Form.Label>
                                <Form.Control
                                    readOnly
                                    id="OwnerIDInput"
                                    type="text"
                                    placeholder= {this.props.specificforum.ownerID}
                                    value= {this.props.specificforum.ownerID}
                                    onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>ForumName</Form.Label>
                                <Form.Control
                                    id="ForumNameInput"
                                    type="text"
                                    placeholder={this.props.specificforum.forumName}
                                    defaultValue={this.props.specificforum.forumName}
                                    name="forumName"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>forumDescription</Form.Label>
                                <Form.Control
                                    id="ForumDescriptionInput"
                                    type="text"
                                    placeholder={this.props.specificforum.forumDescription}
                                    defaultValue={this.props.specificforum.forumDescription}
                                    name="forumDescription"
                                    onChange={this.handleChange}/>
                            </Form.Group>

                            <Button
                                id="SaveForumButton"
                                variant="primary"
                                type="submit"
                                onClick={this.handleSubmit}>
                                Edit Forum
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>{this.props.specificforum._id}</Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    editForum: forumManagementActions.editForum,
}, dispatch);

const ConnectedEditForumModal = connect(mapStateToProps, mapDispatchToProps)(EditForumModal);

export default ConnectedEditForumModal;
