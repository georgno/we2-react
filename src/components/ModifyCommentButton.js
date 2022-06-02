import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import * as commentManagementActions from "../actions/CommentManagementActions";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux'

import EditCommentModal from "./EditCommentModal.js";

const mapStateToProps = state => {
    return state;
}

class ModifyCommentButton extends Component {

    handleCommentDelete(event, accessToken, commentID) {
        event.preventDefault();
        if(!window.confirm("Wollen Sie diesen Kommentar wirklich löschen?")) return;
        const { deleteCommentAction } = this.props;
        deleteCommentAction(accessToken,commentID);
    }

    render() {
        console.log(this.props)
        let givenComment = this.props.givenComment
        let buttons =
            <div className="d-flex justify-content-end">
                <EditCommentModal givenComment={givenComment} />
                <Button variant="danger" id={"DeleteButton" + givenComment._id}
                onClick= { (event) => this.handleCommentDelete(event ,
                this.props.authentication.accessToken, givenComment._id )} >Delete
                </Button>
            </div>
        if(this.props.authentication.isAdministrator) return buttons
        if(this.props.authentication.userID === givenComment.authorID) return buttons
        return null
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteCommentAction: commentManagementActions.deleteComment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCommentButton)