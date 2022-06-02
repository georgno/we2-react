export const SHOW_ADD_COMMENT_DIALOG = 'SHOW_ADD_COMMENT_DIALOG';
export const HIDE_ADD_COMMENT_DIALOG = 'HIDE_ADD_COMMENT_DIALOG';
export const ADD_COMMENT_PENDING = 'ADD_COMMENT_PENDING';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const SHOW_EDIT_COMMENT_DIALOG = 'SHOW_EDIT_COMMENT_DIALOG';
export const HIDE_EDIT_COMMENT_DIALOG = 'HIDE_EDIT_COMMENT_DIALOG';
export const EDIT_COMMENT_PENDING = 'EDIT_COMMENT_PENDING';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_ERROR = 'EDIT_COMMENT_ERROR';

export const DELETE_COMMENT_PENDING = 'DELETE_COMMENT_PENDING';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';

export const GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const GET_COMMENTS_FROM_FORUM_PENDING = 'GET_COMMENTS_FROM_FORUM_PENDING';
export const GET_COMMENTS_FROM_FORUM_SUCCESS = 'GET_COMMENTS_FROM_FORUM_SUCCESS';
export const GET_COMMENTS_FROM_FORUM_ERROR = 'GET_COMMENTS_FROM_FORUM_ERROR';


export function getShowAddCommentDialogAction() {
    return {type: SHOW_ADD_COMMENT_DIALOG}
}

export function getHideAddCommentDialogAction() {
    return {type: HIDE_ADD_COMMENT_DIALOG}
}

export function getAddCommentPendingAction() {
    return {type: ADD_COMMENT_PENDING}
}

export function getAddCommentSuccessAction(comment) {
    return {type: ADD_COMMENT_SUCCESS, comment: comment}
}

export function getAddCommentErrorAction(error) {
    return {type: ADD_COMMENT_ERROR, error: error}
}

export function getShowEditCommentDialogAction() {
    return {type: SHOW_EDIT_COMMENT_DIALOG}
}

export function getHideEditCommentDialogAction() {
    return {type: HIDE_EDIT_COMMENT_DIALOG}
}

export function getEditCommentPendingAction() {
    return {type: EDIT_COMMENT_PENDING}
}

export function getEditCommentSuccessAction(comment) {
    return {type: EDIT_COMMENT_SUCCESS, comment: comment}
}

export function getEditCommentErrorAction(error) {
    return {type: EDIT_COMMENT_ERROR, error: error}
}

export function getDeleteCommentSuccessAction(commentID) {
    return {type: DELETE_COMMENT_SUCCESS, commentID: commentID}
}

export function getDeleteCommentErrorAction(error) {
    return {type: DELETE_COMMENT_ERROR}
}

export function getDeleteCommentPendingAction() {
    return {type: DELETE_COMMENT_PENDING}
}

export function getGetCommentsPendingAction() {
    return {type: GET_COMMENTS_PENDING}
}

export function getGetCommentsErrorAction() {
    return {type: GET_COMMENTS_ERROR}
}

export function getGetCommentsSuccessAction(comments) {
    return {type: GET_COMMENTS_SUCCESS, comments: comments}
}

export function getGetCommentsFromForumPendingAction() {
    return {type: GET_COMMENTS_FROM_FORUM_PENDING}
}

export function getGetCommentsFromForumErrorAction() {
    return {type: GET_COMMENTS_FROM_FORUM_ERROR}
}

export function getGetCommentsFromForumSuccessAction(specificcomments) {
    return {type: GET_COMMENTS_FROM_FORUM_SUCCESS, specificcomments: specificcomments}
}


export function getComments() {

    return dispatch => {
        dispatch(getGetCommentsPendingAction());
        fetch(process.env.REACT_APP_URL + '/forumMessage', {
            "method": "GET",
            "headers": {
                'Content-Type':'application/json',
            }}).then(value => {
                    return value.text().then( text => {
                    let data = JSON.parse(text)
                    dispatch(getGetCommentsSuccessAction(data))
                })
            }, error => {
                dispatch(getGetCommentsErrorAction(error));
            }).catch(error => {
                dispatch(getGetCommentsErrorAction(error));
            })
    }
}

export function getCommentsFromForum(forumID) {

    return dispatch => {
        dispatch(getGetCommentsFromForumPendingAction());
        fetch(process.env.REACT_APP_URL + '/forumMessage/getByForumID', {
            "method": "POST",
            "headers": {
                'Content-Type':'application/json'
            },
            "body": JSON.stringify({
                'forumID': forumID
            })
        }).then(value => {
                return value.text().then( text => {
                let data = JSON.parse(text)
                dispatch(getGetCommentsFromForumSuccessAction(data))
                })
            }, error => {
                dispatch(getGetCommentsFromForumErrorAction(error));
            }).catch(error => {
                dispatch(getGetCommentsFromForumErrorAction(error));
            })
    }
}

export function addComment(accessToken, forumID, messageTitle, messageText, authorID) { 
    return dispatch => {
        dispatch(getAddCommentPendingAction())
        fetch(process.env.REACT_APP_URL + '/forumMessage', {
            "method": "POST",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                'forumID': forumID, 
                'messageTitle': messageTitle,
                'messageText': messageText,
                'authorID': authorID
            })
        }).then(value => {
                return value.text().then( text => {
                let data = JSON.parse(text)
                const action = getAddCommentSuccessAction(data);
                dispatch(action);})
            }, error => {
                dispatch(getAddCommentErrorAction(error));
            }).catch(error => {
                dispatch(getAddCommentErrorAction(error));
            })
    }
}

export function editComment(accessToken, commentID, title, message) { 

    return dispatch => {
        dispatch(getEditCommentPendingAction())
        fetch(process.env.REACT_APP_URL + '/forumMessage', {
            "method": "PUT",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                '_id': commentID,
                'messageTitle': title, 
                'messageText': message   
            })
        }).then(value => {
            return value.text().then( text => {
                let data = JSON.parse(text)
                dispatch(getEditCommentSuccessAction(data))
            })
        }, error => {
            dispatch(getEditCommentErrorAction(error));
        }).catch(error => {
            dispatch(getEditCommentErrorAction(error));
        })
    }
}

export function deleteComment(accessToken, commentID) {

    return dispatch => {
        dispatch(getDeleteCommentPendingAction());
        fetch(process.env.REACT_APP_URL + '/forumMessage', {
            "method": "DELETE",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({'_id': commentID})
        }).then(value => {
            const action = getDeleteCommentSuccessAction(commentID);
            dispatch(action)
        }, error => {
            dispatch(getDeleteCommentErrorAction(error));
        }).catch(error => {
            dispatch(getDeleteCommentErrorAction(error));
        })
    }
}